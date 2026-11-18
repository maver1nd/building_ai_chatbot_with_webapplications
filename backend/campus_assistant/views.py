import os
from django.conf import settings
from django.http import HttpResponse, FileResponse, Http404

def serve_react(request):
    dist_dir = settings.BASE_DIR.parent / 'frontend' / 'dist'
    index_file = dist_dir / 'index.html'
    if index_file.exists():
        with open(index_file, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')
    return HttpResponse("Campus Assistant Frontend Build not found. Run 'npm run build' in frontend directory.", status=404)

def serve_dist_static(request, path):
    dist_dir = settings.BASE_DIR.parent / 'frontend' / 'dist'
    target_file = dist_dir / path
    if target_file.exists() and target_file.is_file():
        return FileResponse(open(target_file, 'rb'))
    raise Http404("File not found")
