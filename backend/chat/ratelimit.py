import time
from collections import defaultdict
from django.core.cache import cache

# In-memory sliding window rate limiter
# SRS Section 9 (NFR-SEC-003): 20 chat requests/min per session, 60/min per IP
SESSION_LIMIT = 20
IP_LIMIT = 60
WINDOW_SECONDS = 60

_session_requests = defaultdict(list)
_ip_requests = defaultdict(list)

def is_rate_limited(session_id, ip_address):
    now = time.time()
    cutoff = now - WINDOW_SECONDS

    # Clean and check session limit
    session_times = [t for t in _session_requests[str(session_id)] if t > cutoff]
    if len(session_times) >= SESSION_LIMIT:
        _session_requests[str(session_id)] = session_times
        return True
    session_times.append(now)
    _session_requests[str(session_id)] = session_times

    # Clean and check IP limit
    ip_times = [t for t in _ip_requests[ip_address] if t > cutoff]
    if len(ip_times) >= IP_LIMIT:
        _ip_requests[ip_address] = ip_times
        return True
    ip_times.append(now)
    _ip_requests[ip_address] = ip_times

    return False
