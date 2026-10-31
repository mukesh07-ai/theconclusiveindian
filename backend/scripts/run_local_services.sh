#!/usr/bin/env bash
# ==============================================================================
# The Conclusive Indian — Local Microservices Development Orchestrator
# Starts all 7 FastAPI microservices and the API Gateway in the local environment
# ==============================================================================

set -e

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$BACKEND_DIR"

if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
elif [ -f "../venv/bin/activate" ]; then
    source ../venv/bin/activate
fi

export PYTHONPATH="$BACKEND_DIR:$PYTHONPATH"

# Load environment variables from .env
if [ -f "$BACKEND_DIR/.env" ]; then
    set -a
    source "$BACKEND_DIR/.env"
    set +a
fi

echo "=========================================================="
echo "🇮🇳 Starting The Conclusive Indian Microservices Suite"
echo "=========================================================="

# Auto-clean any stale processes on microservice ports 8000-8007
echo "🧹 Checking for stale processes on ports 8000-8007..."
for PORT in 8000 8001 8002 8003 8004 8005 8006 8007; do
    PID=$(lsof -ti :$PORT 2>/dev/null || true)
    if [ -n "$PID" ]; then
        echo "   Terminating stale process $PID on port $PORT..."
        kill -9 $PID 2>/dev/null || true
    fi
done
sleep 1

# Trap SIGINT to gracefully terminate all child processes
trap 'kill $(jobs -p) 2>/dev/null || true; echo -e "\n🛑 All microservices stopped."; exit 0' SIGINT SIGTERM


echo "🚀 [1/8] Starting Identity Service on port 8001..."
python3 -m uvicorn services.identity_service.app.main:app --host 0.0.0.0 --port 8001 &

echo "🚀 [2/8] Starting User Service on port 8002..."
python3 -m uvicorn services.user_service.app.main:app --host 0.0.0.0 --port 8002 &

echo "🚀 [3/8] Starting Taxonomy Service on port 8003..."
python3 -m uvicorn services.taxonomy_service.app.main:app --host 0.0.0.0 --port 8003 &

echo "🚀 [4/8] Starting Content & Editorial Service on port 8004..."
python3 -m uvicorn services.content_service.app.main:app --host 0.0.0.0 --port 8004 &

echo "🚀 [5/8] Starting Page Builder Service on port 8005..."
python3 -m uvicorn services.page_builder_service.app.main:app --host 0.0.0.0 --port 8005 &

echo "🚀 [6/8] Starting Media Service on port 8006..."
python3 -m uvicorn services.media_service.app.main:app --host 0.0.0.0 --port 8006 &

echo "🚀 [7/8] Starting Contact & Moderation Service on port 8007..."
python3 -m uvicorn services.contact_moderation_service.app.main:app --host 0.0.0.0 --port 8007 &

sleep 2

echo "🌐 [8/8] Starting API Gateway on port 8000..."
python3 -m uvicorn gateway.app.main:app --host 0.0.0.0 --port 8000 &

echo ""
echo "✅ All 8 microservice processes are active!"
echo "   - API Gateway:       http://localhost:8000 (Docs: http://localhost:8000/docs)"
echo "   - Identity Service:  http://localhost:8001"
echo "   - User Service:      http://localhost:8002"
echo "   - Taxonomy Service:  http://localhost:8003"
echo "   - Content Service:   http://localhost:8004"
echo "   - Page Builder:      http://localhost:8005"
echo "   - Media Service:     http://localhost:8006"
echo "   - Contact Service:   http://localhost:8007"
echo ""
echo "Press Ctrl+C to terminate all services."

wait
