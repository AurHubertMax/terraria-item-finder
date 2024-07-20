import json
from django.core.management.base import BaseCommand
from api.models import Item
import os

base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))
json_file_path = os.path.join(base_dir, 'data', 'items.json')

class Command(BaseCommand):
    help = 'Load data from items.json'

    def handle(self, *args, **kwargs):
        with open(json_file_path, 'r') as file:
            items = json.load(file)
            for item in items:
                Item.objects.create(
                    item_id=item['id'],
                    name=item['name'],
                    recipe1=item['recipe1'],
                    recipe2=item['recipe2'],
                    recipe3=item['recipe3'],
                    recipe4=item['recipe4'],
                    recipe5=item['recipe5'],
                    recipe6=item['recipe6']
                )
        self.stdout.write(self.style.SUCCESS('Data loaded successfully!'))