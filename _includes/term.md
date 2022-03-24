{% for term in site.data.terms %}
{% if {{term.label}} == {{include.label}}%}
<div class="term">
<code><strong>{{ term.label }}</strong></code>
    <br>
<span class="display-definition">{{ term.definition }}</span>
</div>
{% endif %}
{% endfor %}

