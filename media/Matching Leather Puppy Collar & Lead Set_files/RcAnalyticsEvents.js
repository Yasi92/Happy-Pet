/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to a trade license awared by
 * Garamo Online L.T.D.
 *
 * Any use, reproduction, modification or distribution
 * of this source file without the written consent of
 * Garamo Online L.T.D It Is prohibited.
 *
 *  @author    ReactionCode <info@reactioncode.com>
 *  @copyright 2015-2019 Garamo Online L.T.D
 *  @license   Commercial license
 */

function RcAnalyticsEvents() {
    // reference to this
    var publicValues = this;

    ////////////////////////////////////
    // Private values

    var privateValues = {};

    // get module url from common js var prestashop
    privateValues.moduleUrl = prestashop.urls.base_url + 'modules/rc_pganalytics/';

    // don't change this value!! used for redirect after hit
    privateValues.redirected = false;
    privateValues.redirectLink = null;

    // products position detected on scroll tracking
    privateValues.productsPosition = {};

    // scroll tracking event
    privateValues.initial = true;
    privateValues.sendProducts = [];
    privateValues.sentProducts = [];
    privateValues.sendPromotions = [];
    privateValues.sentPromotions = [];
    privateValues.scrollTimeout = null;

    // product page
    privateValues.lastIdProductView = '';

    // don not track
    privateValues.doNotTrack = (
        window.doNotTrack == "1" ||
        navigator.doNotTrack == "yes" ||
        navigator.doNotTrack == "1" ||
        navigator.msDoNotTrack == "1"
    );

    ////////////////////////////////////
    // Public values

    // all tracking features
    publicValues.trackingFeatures = null;

    publicValues.lists = null;

    // cache products
    publicValues.productsListCache = null;

    // remarketing page type
    publicValues.ecommPageType = '';

    // checkout data
    publicValues.controllerName = '';
    publicValues.isCheckout = '';
    publicValues.compliantModuleName = '';
    publicValues.skipCartStep = '';

    // Theme Events
    publicValues.eventScrollList = eventScrollList;
    publicValues.eventClickPromotionItem = eventClickPromotionItem;
    publicValues.eventClickProductList = eventClickProductList;
    publicValues.eventProductView = eventProductView;
    publicValues.eventSocialShareProductView = eventSocialShareProductView;
    publicValues.eventAddCartProduct = eventAddCartProduct;
    publicValues.eventCartQuantityUp = eventCartQuantityUp;
    publicValues.eventCartQuantityDown = eventCartQuantityDown;
    publicValues.eventCartQuantityDelete = eventCartQuantityDelete;
    publicValues.eventPrestashopCheckout = eventPrestashopCheckout;
    publicValues.eventOpcSuperCheckout = eventOpcSuperCheckout;
    publicValues.eventCartOpcSupercheckout = eventCartOpcSupercheckout;
    publicValues.eventOpcPrestaTeam = eventOpcPrestaTeam;
    publicValues.eventCartOpcPrestaTeam = eventCartOpcPrestaTeam;
    publicValues.eventOpcTheCheckout = eventOpcTheCheckout;
    publicValues.eventCartOpcTheCheckout = eventCartOpcTheCheckout;

    // Tracking Methods
    publicValues.onSearchResults = onSearchResults;
    publicValues.onCheckoutProducts = onCheckoutProducts;
    publicValues.onAddOrder = onAddOrder;
    publicValues.onSignUp = onSignUp;

    // GTAG Methods
    publicValues.sendGtagConfig = sendGtagConfig;

    // Common Methods
    publicValues.setClientId = setClientIdInDb;

    // Singleton Pattern
    if (RcAnalyticsEvents.prototype.getInstance) {
        return RcAnalyticsEvents.prototype.getInstance;
    }

    RcAnalyticsEvents.prototype.getInstance = this;

    ///////////////////////////////////////////////
    // THEME EVENTS

    // PRODUCT LISTS - Scroll
    function eventScrollList() {
        if (!privateValues.initial) {
            clearTimeout(privateValues.scrollTimeout);
            scrollElementDetection();

            privateValues.scrollTimeout = setTimeout(function() {
                if (privateValues.sendProducts.length || privateValues.sendPromotions.length) {
                    doneScroll();
                }
            }, 800);
        } else {
            privateValues.initial = false;
            scrollElementDetection();
            doneScroll();
        }
    }

    // PROMOTION CLICK - Click on promotion
    function eventClickPromotionItem(event) {
        var mainSelector = ['.js-ga-track-promo a'];
        var target = delegateEvents(mainSelector, event.target);
        var promoQuery;
        var promoLink;

        // Check if Google Tag Manager is blocked by uBlock or similar
        if (
            event.button === 0 &&
            target &&
            target.nodeName === 'A' &&
            window.ga &&
            window.ga.length
        ) {
            promoQuery = target.search;
            promoLink = target.href;

            if (promoQuery && promoLink) {
                event.preventDefault();
                onPromotionClick(promoQuery, promoLink);
            }

        }

    }

    // PRODUCT LISTS - Click on product
    function eventClickProductList(event) {
        var mainSelector = ['.js-product-miniature'];
        var variantSelector = ['.js-product-miniature .variant-links a'];
        var eventSelectors = [
            '.js-product-miniature .product-thumbnail',
            '.js-product-miniature .product-title a',
            '.js-product-miniature .variant-links a',
            '.js-product-miniature .quick-view'
        ];
        var target = delegateEvents(eventSelectors, event.target);
        var caseClick = 1;
        var classList;
        var link;
        var productNode;
        var variantNode;
        var variantAttribute;
        var idProduct;
        var idProductAttribute;
        var list;

        // Check if Google analytics is blocked by uBlock or similar
        if (event.button === 0 && target && target.nodeName === 'A' && window.ga && window.ga.length) {
            // if click done with ctrl or shift key avoid preventDefault
            if (!event.ctrlKey && !event.shiftKey) {
                // get the target class list
                classList = target.classList;

                // If Quick view event don't get link redirection
                if (!classList.contains('quick-view') && !classList.contains('quick-view-mobile')) {
                    // retrieve the product link.
                    link = target.getAttribute('href');

                    if (link) {
                        // prevent redirection on normal click
                        event.preventDefault();
                    }
                }
            }

            // Get the product node
            productNode = delegateEvents(mainSelector, target);

            // Get variant node
            variantNode = delegateEvents(variantSelector, target);

            if (productNode) {
                idProduct = parseInt(productNode.getAttribute('data-id-product'));
                idProductAttribute = parseInt(productNode.getAttribute('data-id-product-attribute'));
            }

            // Check if any filter is applied
            list = checkFilters();

            if (!isNaN(idProduct)) {
                // If selected color variant
                if (variantNode) {
                    // get the attribute selected
                    variantAttribute = variantNode.getAttribute('data-id-product-attribute');

                    if (variantAttribute) {
                        // if exist update the id product attribute
                        idProductAttribute = variantAttribute;
                    }
                }

                // check if idProductAttribute has valid value
                if (isNaN(idProductAttribute)) {
                    idProductAttribute = 0;
                }

                // add the attribute to idProduct
                idProduct = idProduct + '-' + idProductAttribute;

                // Send data to GA without link redirection
                getData(caseClick, idProduct, list, link, null);
            } else if (link) {
                // If idProduct not detected try redirect to product page
                document.location = link;
            }
        }
    }

    // PRODUCT VIEW - View
    function eventProductView(event) {
        var caseClick = 4;
        var productListView = publicValues.lists.productView;
        var productDetailsNode;
        var productDetails;
        var idProductValue;
        var idProductAttributeValue;
        var idProductView;

        if (document.body.id !== 'product') {
            if (event && event.dataset) {
                // first quick view display
                idProductValue = event.dataset.idProduct;
                idProductAttributeValue = event.dataset.idProductAttribute;
            } else {
                // quick view mode
                idProductValue = document.querySelector('#product_page_product_id').value;
                idProductAttributeValue = event.id_product_attribute;
            }
            productListView = 'quick_view';
        } else {
            // body id product
            productDetailsNode = document.querySelector('#product-details');
            productDetails = JSON.parse(productDetailsNode.dataset.product);
            idProductValue = productDetails.id_product;
            idProductAttributeValue = productDetails.id_product_attribute;
        }

        // normalize id product to track
        idProductView = idProductValue + '-' + idProductAttributeValue;

        // avoid send productView multiple times when change quantity
        if (idProductView !== privateValues.lastIdProductView) {
            getData(caseClick, idProductView, productListView, null, null);
            privateValues.lastIdProductView = idProductView;
        }
    }

    // PRODUCT VIEW - Social actions
    function eventSocialShareProductView(event) {
        var eventSelectors = ['.facebook', '.twitter', '.googleplus', '.pinterest'];
        var target = delegateEvents(eventSelectors, event.target);
        var network;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            if (target) {
                eventSelectors.forEach(function(platform){
                    // remove first char
                    platform = platform.substring(1);
                    // check if platform match
                    if (target.classList.contains(platform)) {
                        network = platform;
                    }
                });

                if (network) {
                    onSocialAction(network);
                }
            }
        }
    }

    // COMMON - Add to cart
    function eventAddCartProduct(event) {
        var caseClick = 2;
        var productViewList = publicValues.lists.productView;
        var idProduct;
        var idProductAttribute;
        var quantityWanted;
        var quickViewModal;

        if (event && event.reason && event.resp && document.body.id !== 'cart') {
            // check if quick view modal display
            quickViewModal = document.querySelector('[id^=quickview-modal]');

            // change product list on quick-view window
            if (quickViewModal) {
                productViewList = 'quick_view';
            }

            idProduct = parseInt(event.reason.idProduct);
            idProductAttribute = parseInt(event.reason.idProductAttribute);

            if (document.body.id === 'product' || quickViewModal) {
                // get the quantity on product page or modal quick view
                quantityWanted = parseInt(document.querySelector('#quantity_wanted').value);
            } else {
                // is add to cart from product list
                quantityWanted = 1;
            }

            if (!isNaN(idProduct) && !isNaN(quantityWanted)) {
                // check if idProductAttribute has valid value
                if (isNaN(idProductAttribute)) {
                    idProductAttribute = 0;
                }

                // add the attribute to idProduct
                idProduct = idProduct + '-' + idProductAttribute;

                getData(caseClick, idProduct, productViewList, null, quantityWanted);
            }
        }
    }

    // CHECKOUT - Increase product
    function eventCartQuantityUp(event) {
        var eventSelectors = ['.js-increase-product-quantity'];
        var mainSelector = ['.cart-item'];
        var target = delegateEvents(eventSelectors, event.target);
        var caseClick = 2;
        var quantityWanted = 1;
        var mainNode;
        var dataNode;
        var idProduct;
        var idProductAttribute;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            mainNode = delegateEvents(mainSelector, target);
            dataNode = mainNode.querySelector('.remove-from-cart');

            if (dataNode) {
                idProduct = parseInt(dataNode.getAttribute('data-id-product'));
                idProductAttribute = parseInt(dataNode.getAttribute('data-id-product-attribute'));
            }

            if (!isNaN(idProduct)) {
                // check if idProductAttribute has valid value
                if (isNaN(idProductAttribute)) {
                    idProductAttribute = 0;
                }

                // add the attribute to idProduct
                idProduct = idProduct + '-' + idProductAttribute;

                getData(caseClick, idProduct, publicValues.lists.default, null, quantityWanted);
            }
        }
    }

    // CHECKOUT - Decrease product
    function eventCartQuantityDown(event) {
        var eventSelectors = ['.js-decrease-product-quantity'];
        var mainSelector = ['.cart-item'];
        var target = delegateEvents(eventSelectors, event.target);
        var caseClick = 3;
        var quantityRemoved = 1;
        var mainNode;
        var dataNode;
        var idProduct;
        var idProductAttribute;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            mainNode = delegateEvents(mainSelector, target);
            dataNode = mainNode.querySelector('.remove-from-cart');

            if (dataNode) {
                idProduct = parseInt(dataNode.getAttribute('data-id-product'));
                idProductAttribute = parseInt(dataNode.getAttribute('data-id-product-attribute'));
            }

            if (!isNaN(idProduct)) {
                // check if idProductAttribute has valid value
                if (isNaN(idProductAttribute)) {
                    idProductAttribute = 0;
                }

                // add the attribute to idProduct
                idProduct = idProduct + '-' + idProductAttribute;

                getData(caseClick, idProduct, publicValues.lists.default, null, quantityRemoved);
            }
        }
    }

    // CHECKOUT - Remove product
    function eventCartQuantityDelete(event) {
        var eventSelectors = ['.remove-from-cart'];
        var mainSelector = ['.cart-item'];
        var target = delegateEvents(eventSelectors, event.target);
        var caseClick = 3;
        var mainNode;
        var idProduct;
        var idProductAttribute;
        var quantityRemoved;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            idProduct = parseInt(target.getAttribute('data-id-product'));
            idProductAttribute = parseInt(target.getAttribute('data-id-product-attribute'));

            mainNode = delegateEvents(mainSelector, target);

            if (mainNode) {
                quantityRemoved = mainNode.querySelector('.js-cart-line-product-quantity');
                quantityRemoved = parseInt((quantityRemoved ? quantityRemoved.value : null));
            }

            if (!isNaN(idProduct) && !isNaN(quantityRemoved)) {
                // check if idProductAttribute has valid value
                if (isNaN(idProductAttribute)) {
                    idProductAttribute = 0;
                }

                // add the attribute to idProduct
                idProduct = idProduct + '-' + idProductAttribute;

                // send data to GA
                getData(caseClick, idProduct, publicValues.lists.default, null, quantityRemoved);
            }
        }
    }

    // CHECKOUT - basic PS checkout
    function eventPrestashopCheckout(event) {
        var eventSelectors = ['#checkout-delivery-step button', '#payment-confirmation button'];
        var target = delegateEvents(eventSelectors, event.target);
        var currentStepNode;
        var shippingNode;
        var paymentNode;
        var checkoutOption;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            // get selected step node
            currentStepNode = document.querySelector('.js-current-step');

            if (currentStepNode.id === 'checkout-delivery-step') {
                // get shipping method
                shippingNode = document.querySelector('[id^=delivery_option_]:checked');
                shippingNode = delegateEvents(['.delivery-option'], shippingNode);
                shippingNode = shippingNode ? shippingNode.querySelector('.carrier-name') : null;
                checkoutOption = shippingNode ? shippingNode.textContent.trim() : '';
            } else if (currentStepNode.id === 'checkout-payment-step') {
                // get payment method
                paymentNode = document.querySelector('[id^=payment-option-]:checked');
                paymentNode = delegateEvents(['.payment-option'], paymentNode);
                paymentNode = paymentNode ? paymentNode.querySelector('[for^=payment-option-] span') : null;
                checkoutOption = paymentNode ? paymentNode.textContent.trim() : '';
            }

            onCheckoutOption(checkoutOption);
        }
    }

    // CHECKOUT - opc by knowband
    function eventOpcSuperCheckout(event){
        var eventSelectors = ['#supercheckout_confirm_order'];
        var mainCarrierSelector = ['.highlight'];
        var mainPaymentSelector = ['.highlight'];
        var target = delegateEvents(eventSelectors, event.target);

        var cgv;
        var shippingNode;
        var shippingOption;
        var paymentNode;
        var paymentOption;
        var checkoutOption;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            cgv = document.querySelector('input[id^=conditions_to_approve]');

            if (!cgv || cgv.checked) {
                // get selected shipping node
                shippingNode = document.querySelector('.supercheckout_shipping_option:checked');

                // if virtual product don't has any shipping node
                if (shippingNode) {
                    shippingNode = delegateEvents(mainCarrierSelector, shippingNode);
                    shippingNode = shippingNode.querySelector('label img') || shippingNode.querySelector('label');

                    // get selected shipping method
                    shippingOption = (shippingNode ? shippingNode.getAttribute('alt') || shippingNode.textContent.trim() : '');
                    shippingOption = normalizeText(shippingOption);
                }

                // get selected payment node
                paymentNode = document.querySelector('#payment-method input:checked');
                paymentNode = delegateEvents(mainPaymentSelector, paymentNode);
                paymentNode = paymentNode.querySelector('label img') || paymentNode.querySelector('label span');

                // get selected payment option
                paymentOption = (paymentNode ? paymentNode.getAttribute('alt') ||  paymentNode.textContent.trim() : '');
                paymentOption = normalizeText(paymentOption);

                // prepare option and send data to GA
                checkoutOption = paymentOption + ' / ' + shippingOption;

                onCheckoutOption(checkoutOption);
            }
        }
    }

    // CHECKOUT - cart actions opc by knowband
    function eventCartOpcSupercheckout(event) {
        var eventSelectors = ['.increase_button','.decrease_button','.removeProduct'];
        var mainSelector = ['[id^=product_]'];
        var target = delegateEvents(eventSelectors, event.target);
        var targetClassList;
        // default case click is add to cart
        var caseClick = 2;
        var quantity = 1;
        var mainNode;
        var dataNode;
        var quantityNode;
        var ids;
        var idProduct;
        var idProductAttribute;
        var indexedProduct;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            // get the class list collection
            targetClassList = target.classList;
            mainNode = delegateEvents(mainSelector, target);

            if (mainNode) {
                dataNode = mainNode.id;

                if (dataNode) {
                    ids = dataNode.split('_');
                    idProduct = parseInt(ids[1]);
                    idProductAttribute = parseInt(ids[2]);
                }

                if (!isNaN(idProduct)) {
                    // check if idProductAttribute has valid value
                    if (isNaN(idProductAttribute)) {
                        idProductAttribute = 0;
                    }

                    // add the attribute to idProduct
                    indexedProduct = idProduct + '-' + idProductAttribute;

                    if (targetClassList.contains('decrease_button') || targetClassList.contains('removeProduct')) {
                        // set case click to remove from cart
                        caseClick = 3;

                        // check if avtion is remove product and get the quantity
                        if (targetClassList.contains('removeProduct')) {
                            quantityNode = mainNode.querySelector('.quantitybox');
                            quantity = parseInt((quantityNode ? quantityNode.value : null));
                        }
                    }
                    // send data to GA
                    getData(caseClick, indexedProduct, publicValues.lists.default, null, quantity);
                }
            }
        }
    }

    // CHECKOUT - opc by PrestaTeam
    function eventOpcPrestaTeam(event){
        var eventSelectors = ['#btn_place_order'];
        var mainCarrierSelector = ['.delivery-option'];
        var mainPaymentSelector = ['.module_payment_container'];
        var target = delegateEvents(eventSelectors, event.target);

        var cgv;
        var shippingNode;
        var shippingOption;
        var paymentNode;
        var paymentOption;
        var checkoutOption;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            cgv = document.querySelector('#cgv');

            if (!cgv || cgv.checked) {
                // get selected shipping node
                shippingNode = document.querySelector('.delivery_option_radio:checked');
                // get selected payment node
                paymentNode = document.querySelector('.payment_radio:checked');

                // if virtual product don't has any shipping node
                if (shippingNode) {
                    shippingNode = delegateEvents(mainCarrierSelector, shippingNode);
                    shippingNode = shippingNode.querySelector('.delivery_option_title');

                    // get selected shipping method
                    shippingOption = (shippingNode ? shippingNode.textContent.trim() : '');
                    shippingOption = normalizeText(shippingOption);
                }

                if (paymentNode) {
                    // continue only if payment method
                    paymentNode = delegateEvents(mainPaymentSelector, paymentNode);
                    paymentNode = paymentNode.querySelector('.payment_content span');

                    // get selected payment option
                    paymentOption = (paymentNode ? paymentNode.textContent.trim() : '');
                    paymentOption = normalizeText(paymentOption);

                    // prepare option and send data to GTAG
                    checkoutOption = paymentOption + ' / ' + shippingOption;
                    onCheckoutOption(checkoutOption);
                }
            }
        }
    }

    // CHECKOUT - cart actions opc by PrestaTeam
    function eventCartOpcPrestaTeam(event) {
        var eventSelectors = ['.bootstrap-touchspin-up','.bootstrap-touchspin-down','.remove-from-cart'];
        var mainSelector = ['.bootstrap-touchspin'];

        var target = delegateEvents(eventSelectors, event.target);
        var targetClassList;

        // default case click is add to cart
        var caseClick = 2;
        var quantity = 1;

        var mainNode;
        var dataNode;
        var quantityNode;
        var idProduct;
        var idProductAttribute;
        var indexedProduct;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            // get the class list collection
            targetClassList = target.classList;
            mainNode = delegateEvents(mainSelector, target);

            if (mainNode) {
                dataNode = mainNode.querySelector('.remove-from-cart');

                if (dataNode) {
                    idProduct = dataNode.dataset.idProduct;
                    idProductAttribute = dataNode.dataset.idProductAttribute;

                    if (!isNaN(idProduct)) {
                        // check if idProductAttribute has valid value
                        if (isNaN(idProductAttribute)) {
                            idProductAttribute = 0;
                        }

                        // add the attribute to idProduct
                        indexedProduct = idProduct + '-' + idProductAttribute;

                        if (
                            targetClassList.contains('bootstrap-touchspin-down') ||
                            targetClassList.contains('remove-from-cart')
                        ) {
                            // set case click to remove from cart
                            caseClick = 3;

                            // check if action is remove product and get the quantity
                            if (targetClassList.contains('remove-from-cart')) {
                                quantityNode = mainNode.querySelector('.cart-line-product-quantity');
                                quantity = parseInt((quantityNode ? quantityNode.value : null));
                            }
                        }

                        // send data to GTAG
                        getData(caseClick, indexedProduct, publicValues.lists.default, null, quantity);
                    }
                }
            }
        }
    }

    // CHECKOUT - opc by zelarg
    function eventOpcTheCheckout(event){
        var eventSelectors = ['#confirm_order'];
        var mainCarrierSelector = ['.delivery-option'];
        var mainPaymentSelector = ['.payment-option'];
        var target = delegateEvents(eventSelectors, event.target);

        var requiredCheckBox1;
        var requiredCheckBox2;
        var shippingNode;
        var shippingOption;
        var paymentNode;
        var paymentOption;
        var checkoutOption;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            requiredCheckBox1 = document.querySelector('input[name=required-checkbox-1]');
            requiredCheckBox2 = document.querySelector('input[name=required-checkbox-2]');

            if (
                (!requiredCheckBox1 || requiredCheckBox1.checked) &&
                (!requiredCheckBox2 || requiredCheckBox2.checked)
            ) {
                // get selected shipping node
                shippingNode = document.querySelector('[id^=delivery_option]:checked');
                // get selected payment node
                paymentNode = document.querySelector('[id^=payment-option]:checked');

                // if virtual product don't has any shipping node
                if (shippingNode) {
                    shippingNode = shippingNode.closest(mainCarrierSelector);
                    shippingNode = shippingNode.querySelector('.carrier-name');

                    // get selected shipping option
                    shippingOption = (shippingNode ? shippingNode.textContent.trim() : '');
                    shippingOption = normalizeText(shippingOption);
                }

                if (paymentNode) {
                    // continue only if payment selected
                    paymentNode = paymentNode.closest(mainPaymentSelector);
                    paymentNode = paymentNode.querySelector('label[for^=payment-option-] span');

                    // get selected payment option
                    paymentOption = (paymentNode ? paymentNode.textContent.trim() : '');
                    paymentOption = normalizeText(paymentOption);

                    // prepare option and send data to GTAG
                    checkoutOption = paymentOption + ' / ' + shippingOption;
                    onCheckoutOption(checkoutOption);
                }
            }
        }
    }

    function eventCartOpcTheCheckout(event) {
        var eventSelectors = ['.cart-line-product-quantity-up','.cart-line-product-quantity-down','.remove-from-cart'];
        var mainSelector = ['.product-line-actions'];

        var target = delegateEvents(eventSelectors, event.target);
        var targetClassList;

        // default case click is add to cart
        var caseClick = 2;
        var quantity = 1;

        var mainNode;
        var dataNode;
        var quantityNode;
        var idProduct;
        var idProductAttribute;
        var indexedProduct;

        if (event.button === 0 && target && window.ga && window.ga.length) {
            // get the class list collection
            targetClassList = target.classList;
            mainNode = delegateEvents(mainSelector, target);

            if (mainNode) {
                dataNode = mainNode.querySelector('.remove-from-cart');

                if (dataNode) {
                    idProduct = dataNode.dataset.idProduct;
                    idProductAttribute = dataNode.dataset.idProductAttribute;

                    if (!isNaN(idProduct)) {
                        // check if idProductAttribute has valid value
                        if (isNaN(idProductAttribute)) {
                            idProductAttribute = 0;
                        }

                        // add the attribute to idProduct
                        indexedProduct = idProduct + '-' + idProductAttribute;

                        if (
                            targetClassList.contains('cart-line-product-quantity-down') ||
                            targetClassList.contains('remove-from-cart')
                        ) {
                            // set case click to remove from cart
                            caseClick = 3;

                            // check if action is remove product and get the quantity
                            if (targetClassList.contains('remove-from-cart')) {
                                quantityNode = mainNode.querySelector('.cart-line-product-quantity');
                                quantity = parseInt((quantityNode ? quantityNode.value : null));
                            }
                        }

                        // send data to GA
                        getData(caseClick, indexedProduct, publicValues.lists.default, null, quantity);
                    }
                }
            }
        }
    }

    ///////////////////////////////////////////////
    // TRACKING METHODS

    // SEARCH RESULT - get the search term
    function onSearchResults() {
        var eventName = 'view_search_results';
        var eventParams = {};
        var searchTerm;

        // verify that page is search
        if (document.body.id === 'search') {
            searchTerm = getSearchTerm();
            if (searchTerm) {
                eventParams.search_term = searchTerm;
                sendGtagEvent(eventName, eventParams);
            }
        }
    }

    // PRODUCT LISTS - scroll tracking
    function onScrollTracking(products) {
        var eventName = 'view_item_list';
        var eventParams;
        var eventDimensions;
        var sendNow;

        // check if is an array and is not empty
        if (Array.isArray(products) && products.length) {
            while (products.length > 0) {
                // get products to send
                sendNow = products.splice(0, publicValues.trackingFeatures.productSendRate);

                // init params to avoid send duplicates
                eventParams = {
                    // add non_interaction to fix bounce rates
                    'non_interaction': 1,
                    'items': []
                };

                // parse all products to send
                sendNow.forEach(function (product) {
                    // set product on params
                    eventParams.items.push(productLayer(product));
                });

                // set remarketing dimensions to params
                if (publicValues.trackingFeatures.config.remarketing ||
                    publicValues.trackingFeatures.config.businessData
                ) {
                    eventDimensions = setRemarketingDimensions(sendNow, publicValues.ecommPageType);
                    // add custom dimensions to params
                    Object.assign(eventParams, eventDimensions);
                }

                // send gtag event
                sendGtagEvent(eventName, eventParams);
            }
        }
    }

    // gtag event - promo view
    function onPromotionView(promotions) {
        var eventName = 'view_promotion';
        var eventParams = {
            'promotions': getPromotionsLayered(promotions)
        };

        // send gtag event
        sendGtagEvent(eventName, eventParams);
    }

    // gtag event - promo click
    function onPromotionClick(promotion, link) {
        var eventName = 'select_content';
        var eventParams = {
            'promotions': [getPromotionLayer(promotion)]
        };

        if (link) {
            privateValues.redirectLink = link;
            eventParams['event_callback'] = callbackWithTimeout(
                function() {
                    redirectLink();
                },
                2000
            );
        }

        // send gtag event
        sendGtagEvent(eventName, eventParams);
    }

    // PRODUCT LISTS - product view click
    function onProductClick(product, link) {
        var eventName = 'select_content';
        var eventParams = {
            'content_type': 'product',
            'items': []
        };

        // set product on params
        eventParams.items.push(productLayer(product));

        if (link) {
            // add redirect to product page.
            privateValues.redirectLink = link;
            eventParams['event_callback'] = callbackWithTimeout(
                function() {
                    redirectLink();
                },
                2000
            );
        }

        // send gtag event
        sendGtagEvent(eventName, eventParams);
    }

    // PRODUCT VIEW - view product on their product page
    function onProductView(product) {
        var eventName = 'view_item';
        var eventParams = {
            'non_interaction': 1,
            'items': []
        };
        var ecommPageType = publicValues.ecommPageType;
        var eventDimensions;

        // set product on params
        eventParams.items.push(productLayer(product));

        if (publicValues.trackingFeatures.config.remarketing ||
            publicValues.trackingFeatures.config.businessData
        ) {
            if (product.list_name === 'quick_view') {
                ecommPageType = 'product';
            }
            eventDimensions = setRemarketingDimensions([product], ecommPageType);
            // add custom dimensions to params
            Object.assign(eventParams, eventDimensions);
        }
        // send gtag event
        sendGtagEvent(eventName, eventParams);
    }

    // PRODUCT VIEW - social network action
    function onSocialAction(network) {
        var eventName = 'share';
        var eventParams = {
            'method' : network,
            'event_value' : publicValues.trackingFeatures.eventValues.socialAction
        };

        if (publicValues.trackingFeatures.goals.socialAction) {
            sendGtagEvent(eventName, eventParams);
        }
    }

    // COMMON - new customer registration
    function onSignUp() {
        // todo check how interact with AdWords
        var index = publicValues.trackingFeatures.isGuest;
        var customerType = publicValues.trackingFeatures.signUpTypes[index];
        var eventName = 'sign_up';
        var eventParams = {
            'method' : customerType,
            'value' : publicValues.trackingFeatures.eventValues.signUp
        };

        if (publicValues.trackingFeatures.goals.signUp && publicValues.trackingFeatures.isNewSignUp) {
            // send data layer
            sendGtagEvent(eventName, eventParams);

            // reset values to avoid multiple sends
            publicValues.trackingFeatures.isNewSignUp = 0;
            publicValues.trackingFeatures.isGuest = 0;
        }
    }

    // COMMON - add to cart on product click
    function onAddToCart(product, link) {
        var eventName = 'add_to_cart';
        var eventParams = {
            'items': []
        };
        var eventDimensions = {};
        var ecommPageType = 'cart';

        // set product on params
        eventParams.items.push(productLayer(product));

        // set remarketing dimensions to params
        if (publicValues.trackingFeatures.config.remarketing ||
            publicValues.trackingFeatures.config.businessData
        ) {
            eventDimensions = setRemarketingDimensions([product], ecommPageType);
            // add custom dimensions to params
            Object.assign(eventParams, eventDimensions);
        }

        // Send data using an event.
        if (!publicValues.trackingFeatures.cartAjax && link) {
            privateValues.redirectLink = link;
            eventParams['event_callback'] = callbackWithTimeout(
                function() {
                    redirectLink();
                },
                2000
            );
        }

        // send gtag event
        sendGtagEvent(eventName, eventParams);
    }

    // COMMON - remove from cart click
    function onRemoveFromCart(product, link) {
        var eventName = 'remove_from_cart';
        var eventParams = {
            'items': []
        };

        // set product on params
        eventParams.items.push(productLayer(product));

        // Send data using an event.
        if (!publicValues.trackingFeatures.cartAjax && link) {
            privateValues.redirectLink = link;
            eventParams['event_callback'] = callbackWithTimeout(
                function() {
                    redirectLink();
                },
                2000
            );
        }

        // send gtag event
        sendGtagEvent(eventName, eventParams);
    }

    // CHECKOUT - send products and actual checkout step
    function onCheckoutProducts(products) {
        var eventName = 'checkout_progress';
        var eventParams;
        var eventDimensions;
        var sendNow;
        var currentCheckoutStep = getCheckOutStep();

        if (currentCheckoutStep === 1) {
            eventName = 'begin_checkout'
        }

        // check if is an array and is not empty
        if (Array.isArray(products) && products.length) {
            while (products.length > 0) {
                // get products to send
                sendNow = products.splice(0, publicValues.trackingFeatures.productSendRate);

                // init params to avoid send duplicates
                eventParams = {
                    'checkout_step': currentCheckoutStep,
                    'items': []
                };

                // parse all products to send
                sendNow.forEach(function (product) {
                    // set product on params
                    eventParams.items.push(productLayer(product));
                });

                // set remarketing dimensions to params
                if (publicValues.trackingFeatures.config.remarketing ||
                    publicValues.trackingFeatures.config.businessData
                ) {
                    eventDimensions = setRemarketingDimensions(sendNow, publicValues.ecommPageType);
                    // add custom dimensions to params
                    Object.assign(eventParams, eventDimensions);
                }

                // send gtag event
                sendGtagEvent(eventName, eventParams);
            }
        }
    }

    // CHECKOUT - option selected by customer
    function onCheckoutOption(checkoutOption) {
        var eventName = 'set_checkout_option';
        var eventParams = {
            'checkout_step': getCheckOutStep(),
            'checkout_option': checkoutOption
        };

        // send gtag event
        sendGtagEvent(eventName, eventParams);
    }

    // CHECKOUT - process order data
    function onAddOrder(order, products, idShop) {
        var eventName = 'purchase';
        var adWordsConversionEventName = 'conversion';
        var adWordsConversionParams = {
            'transaction_id': order.transaction_id,
            'value': order.value,
            'currency': publicValues.trackingFeatures.currency
        };
        var productLength = products.length;
        var firstLoop = 1;
        var eventDimensions;
        var eventParams;
        var sendNow;

        if (Array.isArray(products) && products.length) {
            while (products.length > 0) {
                // get products to send
                sendNow = products.splice(0, publicValues.trackingFeatures.productSendRate);

                // init params to avoid send duplicates
                eventParams = {
                    'items': [],
                    'send_to': publicValues.trackingFeatures.analyticsId
                };

                // add event callback on first loop
                if (firstLoop) {
                    eventParams['event_callback'] = callbackWithTimeout(
                        function() {
                            setOrderInDb(order.transaction_id, idShop);
                        },
                        1000
                    );
                    firstLoop = 0;
                }

                // set order values to params
                Object.keys(order).forEach(function (key) {
                    if (order[key] !== null && order[key] !== false && order[key] !== '') {
                        // if order is spliced don't save value key
                        if (key === 'value' && productLength > publicValues.trackingFeatures.productSendRate) {
                            // skip value key
                            return;
                        }
                        eventParams[key] = order[key];
                    }
                });

                // parse all products to send
                sendNow.forEach(function (product) {
                    // set product on params
                    eventParams.items.push(productLayer(product));
                });

                // send remarketing dimensions to params
                if (publicValues.trackingFeatures.config.remarketing ||
                    publicValues.trackingFeatures.config.businessData
                ) {
                    eventDimensions = setRemarketingDimensions(sendNow, publicValues.ecommPageType);
                    // add custom dimensions to params
                    Object.assign(eventParams, eventDimensions);
                }

                // send gtag event
                sendGtagEvent(eventName, eventParams);
            }

            // after process ga transaction send AdWords transaction
            if (publicValues.trackingFeatures.adwordsId && publicValues.trackingFeatures.adwordsCl) {
                // required to process adwords conversion
                adWordsConversionParams['send_to'] =
                    publicValues.trackingFeatures.adwordsId +
                    '/' +
                    publicValues.trackingFeatures.adwordsCl
                ;

                sendGtagEvent(adWordsConversionEventName, adWordsConversionParams);
            }
        }
    }

    // TRACKING - Configure GTAG
    function sendGtagConfig(configId) {
        var configElement = publicValues.trackingFeatures[configId];
        var configFeatures = publicValues.trackingFeatures.config;
        var configParams = {};
        var doNotTrack = (publicValues.trackingFeatures.checkDoNotTrack && privateValues.doNotTrack);

        if (publicValues.trackingFeatures.disableInternalTracking || doNotTrack) {
            window['ga-disable-' + publicValues.trackingFeatures.analyticsId] = true;
        }

        // add params for analytics configuration
        if (configId === 'analyticsId') {
            // add configParams
            configParams['site_speed_sample_rate'] = configFeatures.simpleSpeedSampleRate;
            configParams['anonymize_ip'] = configFeatures.anonymizeIp;
            configParams['link_attribution'] = configFeatures.linkAttribution;

            if (configFeatures.userIdFeature) {
                configParams['user_id'] = configFeatures.userIdValue;
            }

            if (configFeatures.remarketing || configFeatures.businessData) {
                configParams['custom_map'] = {};
                // set ecomm index dimensions
                if (configFeatures.remarketing) {
                    configParams.custom_map['dimension' + configFeatures.customDimensions['ecommProdId']] = 'ecomm_prodid';
                    configParams.custom_map['dimension' + configFeatures.customDimensions['ecommPageType']] = 'ecomm_pagetype';
                    configParams.custom_map['dimension' + configFeatures.customDimensions['ecommTotalValue']] = 'ecomm_totalvalue';
                    configParams.custom_map['dimension' + configFeatures.customDimensions['ecommCategory']] = 'ecomm_category';
                }
                // set dynx index dimensions
                if (configFeatures.businessData) {
                    configParams.custom_map['dimension' + configFeatures.customDimensions['dynxItemId']] = 'dynx_itemid';
                    configParams.custom_map['dimension' + configFeatures.customDimensions['dynxItemId2']] = 'dynx_itemid2';
                    configParams.custom_map['dimension' + configFeatures.customDimensions['dynxPageType']] = 'dynx_pagetype';
                    configParams.custom_map['dimension' + configFeatures.customDimensions['dynxTotalValue']] = 'dynx_totalvalue';
                }
            } else {
                configParams['allow_display_features'] = configFeatures.remarketing;
            }

            if (Array.isArray(configFeatures.crossDomainList) && configFeatures.crossDomainList.length) {
                configParams['linker'] = {'domains': configFeatures.crossDomainList};
            }

            if (configFeatures.optimizeId) {
                configParams['optimize_id'] = configFeatures.optimizeId;
            }

            // set permanent values
            configParams['currency'] = publicValues.trackingFeatures.currency;
        } else if (configId === 'adwordsId') {
            // avoid send remarketing hit on page view to AdWords
            configParams['send_page_view'] = false;
        }

        if (configElement) {
            gtag('config', configElement, configParams);
        }
    }

    // TRACKING - Send event
    function sendGtagEvent(eventName, eventParams) {
        // send event to analytics
        gtag('event', eventName, eventParams);
    }

    /////////////////////////////////////////////
    // TRACKING TOOLS
    function getPromotionsLayered(promotions) {
        var promotionsLayered = [];

        promotions.forEach(function (promotion) {
            promotionsLayered.push(getPromotionLayer(promotion));
        });

        return promotionsLayered;
    }

    function getPromotionLayer(promotion) {
        var promotionFields = {
            'pid': 'id',
            'pn': 'name',
            'pc': 'creative_name',
            'pp': 'creative_slot'
        };
        var promotionLayer = {};
        var promotionQueryData;
        var gaKey;

        promotionQueryData = getQueryData(promotion);

        Object.keys(promotionFields).forEach(function(key) {
            gaKey = promotionFields[key];
            if (promotionQueryData.hasOwnProperty(key)) {
                promotionLayer[gaKey] = decodeURIComponent(promotionQueryData[key]);
            }
        });
        return promotionLayer;
    }

    // GENERAL - get product model
    function productLayer(product) {
        var productKeys = [
            'id',
            'name',
            'variant',
            'brand',
            'category',
            'list_name',
            'list_position',
            'quantity',
            'price',
            'coupon'
        ];
        var gaProduct = {};

        // populate the ga productFieldObject
        productKeys.forEach(function(key){
            if (product[key] !== null) {
                gaProduct[key] = product[key];
            }
        });

        return gaProduct;
    }

    // GENERAL - get remarketing dimensions
    function setRemarketingDimensions(products, ecommPageType) {
        var ecommDimensions = {};
        var businessDimensions = {};
        var remarketingDimensions = {};
        var totalValue = 0;
        var productPrice = 0;

        products.forEach(function(product){

            // set basic product price
            productPrice = product.price;

            // check if product have quantity
            if (product.quantity) {
                productPrice = productPrice * product.quantity;
            }
            // calc total_value dimension and cut to 2 decimals
            totalValue = parseFloat((totalValue + productPrice).toFixed(2));

            if (publicValues.trackingFeatures.config.remarketing) {
                ecommDimensions = processEcommProduct(product, ecommDimensions, ecommPageType, totalValue);
            }

            // add products ids and attribute ids to dynx tags
            if (publicValues.trackingFeatures.config.businessData) {
                businessDimensions = processBusinessProduct(product, businessDimensions, ecommPageType, totalValue);
            }
        });

        // merge business data to remarketing dimensions
        Object.assign(remarketingDimensions, ecommDimensions, businessDimensions);

        return remarketingDimensions;
    }

    // REMARKETING - Generate custom id product to match with remarketing data feed
    function getFeedIdProduct(idProduct, idAttribute, feedPrefix, feedVariant, feedSuffix) {
        var feedIdProduct = idProduct;

        if (feedVariant && idAttribute) {
            feedIdProduct = idProduct + feedVariant + idAttribute;
        }

        return feedPrefix + feedIdProduct + feedSuffix;
    }

    function processEcommProduct(product, ecommDimensions, ecommPageType, totalValue) {
        var feedIdProduct;

        // set pagetype
        ecommDimensions.ecomm_pagetype = ecommPageType;

        // set ecomm_prodid
        if (ecommPageType === 'product' ||
            ecommPageType === 'cart' ||
            ecommPageType === 'purchase'
        ) {
            // feed id product
            feedIdProduct = getFeedIdProduct(
                product.id,
                product.id_attribute,
                publicValues.trackingFeatures.merchantPrefix,
                publicValues.trackingFeatures.merchantVariant,
                publicValues.trackingFeatures.merchantSuffix
            );

            if (ecommPageType === 'cart' ||
                ecommPageType === 'purchase'
            ) {
                // init ecom_prodid_item at first loop
                if (!ecommDimensions.hasOwnProperty('ecomm_prodid')) {
                    ecommDimensions.ecomm_prodid = [];
                }

                // add product dimension to array
                ecommDimensions.ecomm_prodid.push(feedIdProduct);
            } else {
                // add product dimension directly
                ecommDimensions.ecomm_prodid = feedIdProduct;
            }
        }

        // set ecomm_totalvalue
        if (ecommPageType === 'product' ||
            ecommPageType === 'cart' ||
            ecommPageType === 'purchase'
        ) {
            // update totalvalue dimension
            ecommDimensions.ecomm_totalvalue = totalValue;
        }

        // set ecomm_category
        if ((ecommPageType === 'category' ||
            ecommPageType === 'product') &&
            product.category
        ) {
            ecommDimensions.ecomm_category = product.category;
        }
        return ecommDimensions;
    }

    function processBusinessProduct(product, businessDimensions, ecommPageType, totalValue) {
        var dynxPageTypes = {
            'home': 'home',
            'searchresults': 'searchresults',
            'product': 'offerdetail',
            'cart': 'conversionintent',
            'purchase': 'conversion'
        };
        var dynxPageType = 'other';
        var idAttribute;
        var feedIdProduct;

        // convert ecomm pagetype to dynx page type
        if (dynxPageTypes.hasOwnProperty(ecommPageType)) {
            dynxPageType = dynxPageTypes[ecommPageType];
        }

        // set dynx_pagetype
        businessDimensions.dynx_pagetype = dynxPageType;

        // set dynx_itemid and dynx_itemid2
        if (dynxPageType === 'searchresults' ||
            dynxPageType === 'offerdetail' ||
            dynxPageType === 'conversionintent' ||
            dynxPageType === 'conversion'
        ) {
            // basic id product
            feedIdProduct = getFeedIdProduct(
                product.id,
                product.id_attribute,
                publicValues.trackingFeatures.businessDataPrefix,
                publicValues.trackingFeatures.businessDataVariant,
                ''
            );

            // if don't exist variant separator add attribute on itemid2
            if (!publicValues.trackingFeatures.businessDataVariant) {
                // init dynx_item2 at first loop
                if (!businessDimensions.hasOwnProperty('dynx_itemid2')) {
                    businessDimensions.dynx_itemid2 = [];
                }

                if (product.id_attribute) {
                    idAttribute = product.id_attribute.toString();
                }

                // add data to itemid2
                businessDimensions.dynx_itemid2.push(idAttribute);
            }

            // init dynx_item at first loop
            if (!businessDimensions.hasOwnProperty('dynx_itemid')) {
                businessDimensions.dynx_itemid = [];
            }
            // add data to itemid
            businessDimensions.dynx_itemid.push(feedIdProduct);

            // set dynx_totalvalue
            if (dynxPageType === 'offerdetail' ||
                dynxPageType === 'conversionintent' ||
                dynxPageType === 'conversion'
            ) {
                // update totalvalue dimension
                businessDimensions.dynx_totalvalue = totalValue
            }
        }
        return businessDimensions;
    }

    // SEARCH RESULT - get the search term
    function getSearchTerm() {
        var searchWordNode;
        var searchTerm;

        if (document.body.id === 'search') {
            searchWordNode = document.querySelector('#search_widget input[name=s]');
            searchTerm = searchWordNode.value || null;
        }
        return searchTerm;
    }

    // CHECKOUT - get step position
    function getCheckOutStep() {
        var currentStepValue = 1;
        var currentStepNode;

        if (publicValues.isCheckout) {
            if (
                document.body.id === 'checkout' &&
                publicValues.controllerName === 'order' &&
                !publicValues.compliantModuleName
            ) {
                // get selected step node
                currentStepNode = document.querySelector('.js-current-step');

                // get step value of selected step
                switch (currentStepNode.id) {
                    case 'checkout-personal-information-step':
                        currentStepValue = 2;
                        break;
                    case 'checkout-addresses-step':
                        currentStepValue = 3;
                        break;
                    case 'checkout-delivery-step':
                        currentStepValue = 4;
                        break;
                    case 'checkout-payment-step':
                        currentStepValue = 5;
                        break;
                }
            } else if (
                publicValues.controllerName === publicValues.compliantModuleName ||
                (
                    publicValues.controllerName === 'order' &&
                    publicValues.compliantModuleName === 'onepagecheckoutps' &&
                    publicValues.skipCartStep === ''
                )
            ) {
                currentStepValue = 2;
            }
            // return current checkout step
            return currentStepValue;
        }
    }

    /////////////////////////////////////////////
    // AJAX REQUEST

    // AJAX - get Product data and send to GA
    function getData(caseClick, idProducts, list, link, quantityWanted) {
        var req = new XMLHttpRequest();
        var url = privateValues.moduleUrl + 'rc_pganalytics-ajax.php';
        var data = {
            'action': 'product',
            'products_position': privateValues.productsPosition,
            'list': list,
            'quantity_wanted': quantityWanted,
            'products_list_cache': publicValues.productsListCache
        };
        var formData;
        var response;
        var type;

        if (typeof idProducts === 'object') {
            // for products lists
            data['id_products'] = idProducts;
        } else {
            // for product page or events
            data['id_products'] = [idProducts];
        }

        formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('token', publicValues.trackingFeatures.token);

        req.open('POST', url, true);
        req.onreadystatechange = function () {
            try {
                if (req.status === 200) {
                    if (req.readyState === 4) {
                        type = req.getResponseHeader('Content-Type');
                        if (type === 'application/json') {
                            response = JSON.parse(req.responseText);
                            if (typeof response === 'object') {
                                if (caseClick === 0) {
                                    onScrollTracking(response);
                                } else if (caseClick === 1) {
                                    onProductClick(response[0], link);
                                } else if (caseClick === 2) {
                                    onAddToCart(response[0], link);
                                } else if (caseClick === 3) {
                                    onRemoveFromCart(response[0], link);
                                } else if (caseClick === 4) {
                                    onProductView(response[0]);
                                }
                            }
                        } else {
                            throw 'response is not an JSON object';
                        }
                    }
                } else {
                    throw 'Unexpected XHR error';
                }
            } catch (error) {
                console.warn('rc_pganalytics: ' + error);
                if (link) {
                    // add redirect to product page.
                    privateValues.redirectLink = link;
                    redirectLink();
                }
            }
        };
        req.send(formData);
    }

    // TRANSACTION - after sent transaction set order data in DB
    function setOrderInDb(orderId, idShop) {
        var req = new XMLHttpRequest();
        var url = privateValues.moduleUrl + 'rc_pganalytics-ajax.php';
        var data = {
            'action': 'orderComplete',
            'is_order': true,
            'id_order': orderId,
            'id_shop': idShop,
            'id_customer': publicValues.trackingFeatures.config.userIdValue
        };
        var adBlocker = (!window.ga || !window.ga.length);
        var doNotTrack = (publicValues.trackingFeatures.checkDoNotTrack && privateValues.doNotTrack);
        var formData;

        // check if ga is loaded
        if (doNotTrack || adBlocker) {
            data.action = 'abortedTransaction';
            data.doNotTrack = privateValues.doNotTrack;
            data.adBlocker = adBlocker;
        }

        formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('token', publicValues.trackingFeatures.token);

        req.open('POST', url, true);
        req.send(formData);
    }

    // check if clientId exist and set to control DB
    function setClientIdInDb() {
        var clientId;
        var trackers;
        var req;
        var url;
        var data;
        var formData;

        // fire only when ga is enabled
        if (window.ga) {
            ga(function () {
                // get all trackers
                trackers = ga.getAll();
                // check is trackers is an Array and is not empty
                if (Array.isArray(trackers) && trackers.length) {
                    // get clientId of customer
                    clientId = trackers[0].get('clientId');

                    if (clientId && clientId !== publicValues.trackingFeatures.clientId) {
                        req = new XMLHttpRequest();
                        url = privateValues.moduleUrl + 'rc_pganalytics-ajax.php';
                        data = {
                            'action': 'clientId',
                            'id_customer': publicValues.trackingFeatures.config.userIdValue,
                            'id_shop': publicValues.trackingFeatures.idShop,
                            'client_id': clientId
                        };

                        formData = new FormData();
                        formData.append('data', JSON.stringify(data));
                        formData.append('token', publicValues.trackingFeatures.token);

                        req.open('POST', url, true);
                        // setRequestHeader breaks the formData object, don't add it
                        req.send(formData);
                    }
                }
            });
        }
    }

    /////////////////////////////////////////////
    // EVENTS - TOOLS

    // SCROLL - Detect products  and promos on scroll
    function scrollElementDetection() {
        var products = document.querySelectorAll('.js-product-miniature');
        var promos = document.querySelectorAll('.js-ga-track-promo');

        if (products.length) {
            processScrollElement(products, 'product');
        }

        if (promos.length) {
            processScrollElement(promos, 'promo');
        }
    }

    function processScrollElement(elements, type) {
        var visibleElement;
        var idProduct;
        var idProductAttribute;
        var isInViewport;

        elements.forEach(function(element){
            isInViewport = isElementInViewport(element);

            if (isInViewport) {
                // handle product cases
                if (type === 'product') {
                    // get product data
                    idProduct = parseInt(element.getAttribute('data-id-product'));
                    idProductAttribute = parseInt(element.getAttribute('data-id-product-attribute')) | 0;

                    if (!isNaN(idProduct)) {
                        // set element index format
                        visibleElement = idProduct + '-' + idProductAttribute;

                        // check that element has not sent and is not a duplicate
                        if (privateValues.sentProducts.indexOf(visibleElement) === -1 &&
                            privateValues.sendProducts.indexOf(visibleElement) === -1) {
                            privateValues.sendProducts.push(visibleElement);
                        }
                    }
                }

                // handle promo cases
                else if (type === 'promo') {
                    // index promotions with query selector
                    visibleElement = element.querySelector('a').search;

                    if (visibleElement) {
                        // check that element has not sent and is not a duplicate
                        if (privateValues.sentPromotions.indexOf(visibleElement) === -1 &&
                            privateValues.sendPromotions.indexOf(visibleElement) === -1) {
                            privateValues.sendPromotions.push(visibleElement);
                        }
                    }
                }
            }
        });
    }

    // SCROLL - Calc product position
    function scrollProductPositionDetection() {
        // populate productsPosition counting
        // every product with class .js-product-miniature
        var products = document.querySelectorAll('.js-product-miniature');
        var actualPosition = getInitPosition();
        var productKey;
        var idProduct;
        var idProductAttribute;

        products.forEach(function(product){
            idProduct = parseInt(product.getAttribute('data-id-product'));
            idProductAttribute = parseInt(product.getAttribute('data-id-product-attribute'));

            if (isNaN(idProductAttribute)) {
                idProductAttribute = 0;
            }

            if (!isNaN(idProduct)) {
                productKey = idProduct + '-' + idProductAttribute;

                // check if productsPosition has the product ID as key
                if(!privateValues.productsPosition.hasOwnProperty(productKey)) {
                    privateValues.productsPosition[productKey] = actualPosition;
                    actualPosition ++;
                }
            }
        });
    }
    // SCROLL - Get initial product position
    function getInitPosition() {
        var pagination;
        var itemsNumber;

        pagination = document.querySelector('.current .disabled.js-search-link');
        pagination = (pagination ? pagination.textContent.trim() : 1);
        itemsNumber = publicValues.trackingFeatures.productsPerPage;

        // get the first product position
        return (parseInt(itemsNumber) * parseInt(pagination)) - parseInt(itemsNumber) + 1;
    }
    // SCROLL - Launch event
    function doneScroll() {
        var caseClick = 0;
        var list;

        // check if exists new products to send
        if (privateValues.sendProducts.length > 0) {
            // calculate products position in each scroll for possible lazy loads products
            scrollProductPositionDetection();
            list = checkFilters();
            // process data to GA
            getData(caseClick, privateValues.sendProducts, list, null, null);
            // add new products to sent list
            Array.prototype.push.apply(privateValues.sentProducts, privateValues.sendProducts);
            // reset sendProducts to avoid multiple sends
            privateValues.sendProducts = [];
        }

        // check if exists new promotions to send
        if (privateValues.sendPromotions.length > 0) {
            // send promo view to GA
            onPromotionView(privateValues.sendPromotions);
            // add new products to sent list
            Array.prototype.push.apply(privateValues.sentPromotions, privateValues.sendPromotions);
            // reset sendPromotions to avoid multiple sends
            privateValues.sendPromotions = [];
        }
        clearTimeout(privateValues.scrollTimeout);
    }

    function checkFilters() {
        var list = publicValues.lists.default;
        // get filter nodes
        var isEnabledFilter = document.querySelector('#js-active-search-filters');

        if (isEnabledFilter && isEnabledFilter.className === 'active_filters') {
            list = publicValues.lists.filter;
        } else if (document.body.id === 'search') {
            list = publicValues.lists.search;
            publicValues.ecommPageType = 'searchresults';
        }

        return list;
    }

    ///////////////////////
    // COMMON TOOLS

    // GENERAL - redirect to new location
    function redirectLink() {
        if (!privateValues.redirected) {
            // set flag to avoid multiple redirection
            privateValues.redirected = true;
            window.location = privateValues.redirectLink;
        }
    }

    // GENERAL - timeout method to avoid page blocking
    function callbackWithTimeout(callback, timeout) {
        var called = false;

        function fn() {
            if (!called) {
                called = true;
                callback();
            }
        }
        setTimeout(fn, timeout || 1000);

        return fn;
    }

    // parse query link to get object
    function getQueryData(query) {
        var vars = {};
        query.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    // check if element is inside viewport
    function isElementInViewport(element) {
        var isVisible = false;
        var winHeight = window.innerHeight;
        var winOffset = window.pageYOffset;
        var minY = winOffset;
        var maxY = winOffset + winHeight;
        var itemTop;
        var itemBottom;
        var elHeight;
        var elComputedStyle;
        var elHeightPadding;
        var rect;

        // size of inner height including padding
        elHeight = element.clientHeight;

        // if elHeight === 0 means element is not visible or have display none
        if (elHeight) {
            // get computed styles to retrieve the real padding applied on css styles.
            elComputedStyle = getComputedStyle(element);

            // sum the top and bottom padding to get the height padding
            elHeightPadding = parseInt(elComputedStyle.paddingTop) + parseInt(elComputedStyle.paddingBottom);

            // get element rectangle
            rect = element.getBoundingClientRect();

            // calc element display position
            itemTop = rect.top + winOffset;
            itemBottom = itemTop + (elHeight - elHeightPadding);

            // check if element is inside display
            isVisible = (
                (itemTop >= minY && itemTop < maxY) ||
                (itemBottom >= minY && itemBottom < maxY)
            );
        }
        return isVisible;
    }

    // Remove extra spaces
    function normalizeText(text) {
        var filtered = '';

        if (typeof text === 'string') {
            filtered = text.replace(/^\s+|\n+.*/g, '').trim();
        }

        return filtered;
    }

    // Like JQ closest
    function delegateEvents(selectors, target) {

        var matchMode;

        if (target) {
            // get available browser matches function
            matchMode = target.matches || target.webkitMatchesSelector || target.msMatchesSelector;

            // get function name (general browsers || iE9)
            matchMode = matchMode.name || /function\s+([\w\$]+)\s*\(/.exec( matchMode.toString() );

            // on iE9 get the name value, empty value on anonymous fn
            if (typeof matchMode !== 'string') {
                matchMode = matchMode ? matchMode[1] : '';
            }

            // continue only if we get matches selector function
            if (matchMode) {
                while (target.parentNode !== null) {
                    if (target.nodeType === 1) {
                        // iterate all selectors
                        for (var i = 0; i < selectors.length; i++) {
                            // compare if node match with selector
                            if (target[matchMode](selectors[i])) {
                                // if match return target
                                return target;
                            }
                        }
                    }
                    // if no match or nodeType != 1 go to parent
                    target = target.parentNode;
                }
            }
        }
    }
}
