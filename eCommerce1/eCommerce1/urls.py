from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('products.urls')),
]

# ✅ Serve media files (needed for images to work)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# ✅ Catch-all route for React app (MUST be last)
urlpatterns += [
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]
