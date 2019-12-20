# Generated by Django 2.2.6 on 2019-11-14 13:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0012_auto_20191112_1252'),
    ]

    operations = [
        migrations.CreateModel(
            name='Day',
            fields=[
                ('day', models.IntegerField(default=14, primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='potency',
            name='day',
            field=models.ForeignKey(default=14, on_delete=django.db.models.deletion.CASCADE, to='database.Day'),
        ),
    ]