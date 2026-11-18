from django.contrib import admin
from django.urls import path, re_path, include
from .views import serve_react, serve_dist_static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('chat.urls')),
    re_path(r'^(?P<path>(assets|images)/.*)$', serve_dist_static, name='dist_static'),
    re_path(r'^(?P<path>logo_crest\.svg)$', serve_dist_static, name='crest_icon'),
    re_path(r'^(?!api/|admin/).*$', serve_react, name='react_app'),
]
