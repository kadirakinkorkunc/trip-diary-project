# Generated by Django 3.0.4 on 2020-03-20 01:26

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('notes', models.CharField(max_length=10000)),
                ('start_date', models.DateField(null=True)),
                ('end_date', models.DateField(null=True)),
                ('created_at', models.DateField(default=datetime.date.today)),
                ('owner_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='authapi.Member')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]