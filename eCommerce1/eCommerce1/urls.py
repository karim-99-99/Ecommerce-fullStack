from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.views.static import serve
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('products.urls')),
]

# ✅ Serve media files in production (before catch-all route)
# This handles old images stored locally before Cloudinary migration
if not settings.DEBUG:
    # Serve media files in production
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT,
        }),
    ]
else:
    # Serve media and static files in development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# ✅ Serve React build assets (JS, CSS, images, etc.)
react_dist_path = os.path.join(settings.BASE_DIR, 'static', 'dist')
react_assets_path = os.path.join(react_dist_path, 'assets')

# Serve React build assets in both dev and production
if os.path.exists(react_assets_path):
    urlpatterns += [
        re_path(r'^assets/(?P<path>.*)$', serve, {
            'document_root': react_assets_path,
        }),
    ]

# ✅ Catch-all route for React app (MUST be last, excludes API, admin, media, static, and assets)
# This serves index.html for all routes, allowing React Router to handle client-side routing
urlpatterns += [
    re_path(r"^(?!api|admin|media|static|assets).*$", TemplateView.as_view(template_name="index.html")),
]
