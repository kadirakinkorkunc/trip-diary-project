# Generated by Django 3.0.4 on 2020-03-21 02:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('feedapi', '0002_auto_20200321_0222'),
        ('authapi', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Member',
        ),
    ]
