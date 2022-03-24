{% for img in site.data.images %}
  {% if {{img.name}} == {{include.name}}%}
    {% if {{img.noLightbox}} %}
![{{ img.name }}]({{ img.path }}){:class="{{ img.class }}"}{:id="{{ img.name }}"}
    {% else %}
[![{{ img.name }}]({{ img.path }} '{{img.description}}'){:class="{{ img.class }}"}]({{ img.path }})
    {% endif%}
  {% endif %}
{% endfor %}
