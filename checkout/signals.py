from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .models import OrderLineItem


@receiver(post_save, sender=OrderLineItem)
def update_on_save(sender, instance, created, **kwargs):
    """
    update order total on lineitem update/create
    """
    instance.order.update_total()



@receiver(post_delete, sender=OrderLineItem)
def delete_on_save(sender, instance, **kwargs):
    """
    delete order total on lineitem delete
    """
    instance.order.update_total()    