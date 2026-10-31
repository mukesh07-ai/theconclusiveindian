#!/usr/bin/env bash
# ==============================================================================
# The Conclusive Indian — Start Microservices Suite in Background (Daemon)
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

mkdir -p "$BACKEND_DIR/logs"

echo "=========================================================="
echo "🇮🇳 Starting The Conclusive Indian Backend (Background Mode)"
echo "=========================================================="

echo "🧹 Checking and freeing ports 8000-8007..."
for PORT in 8000 8001 8002 8003 8004 8005 8006 8007; do
    PID=$(lsof -ti :$PORT 2>/dev/null || true)
    if [ -n "$PID" ]; then
        echo "   Killing existing process $PID on port $PORT..."
        kill -9 $PID 2>/dev/null || true
    fi
done
sleep 1

echo "🚀 Starting Identity Service (8001)..."
nohup python3 -m uvicorn services.identity_service.app.main:app --host 0.0.0.0 --port 8001 > "$BACKEND_DIR/logs/identity_service.log" 2>&1 &

echo "🚀 Starting User Service (8002)..."
nohup python3 -m uvicorn services.user_service.app.main:app --host 0.0.0.0 --port 8002 > "$BACKEND_DIR/logs/user_service.log" 2>&1 &

echo "🚀 Starting Taxonomy Service (8003)..."
nohup python3 -m uvicorn services.taxonomy_service.app.main:app --host 0.0.0.0 --port 8003 > "$BACKEND_DIR/logs/taxonomy_service.log" 2>&1 &

echo "🚀 Starting Content Service (8004)..."
nohup python3 -m uvicorn services.content_service.app.main:app --host 0.0.0.0 --port 8004 > "$BACKEND_DIR/logs/content_service.log" 2>&1 &

echo "🚀 Starting Page Builder Service (8005)..."
nohup python3 -m uvicorn services.page_builder_service.app.main:app --host 0.0.0.0 --port 8005 > "$BACKEND_DIR/logs/page_builder_service.log" 2>&1 &

echo "🚀 Starting Media Service (8006)..."
nohup python3 -m uvicorn services.media_service.app.main:app --host 0.0.0.0 --port 8006 > "$BACKEND_DIR/logs/media_service.log" 2>&1 &

echo "🚀 Starting Contact Service (8007)..."
nohup python3 -m uvicorn services.contact_moderation_service.app.main:app --host 0.0.0.0 --port 8007 > "$BACKEND_DIR/logs/contact_service.log" 2>&1 &

sleep 2

echo "🌐 Starting API Gateway (8000)..."
nohup python3 -m uvicorn gateway.app.main:app --host 0.0.0.0 --port 8000 > "$BACKEND_DIR/logs/gateway.log" 2>&1 &

echo "⏳ Waiting for Gateway to be healthy..."
for i in {1..15}; do
    if curl -s http://localhost:8000/health >/dev/null 2>&1; then
        echo "✅ API Gateway and Services are UP and HEALTHY!"
        echo ""
        echo "   - API Gateway:       http://localhost:8000 (Docs: http://localhost:8000/docs)"
        echo "   - Health Endpoint:   http://localhost:8000/health"
        echo "   - Service Logs:      $BACKEND_DIR/logs/*.log"
        echo "   - Stop Services:     ./scripts/stop_services.sh"
        exit 0
    fi
    sleep 1
done

echo "⚠️  Gateway did not respond in 15 seconds. Check logs in $BACKEND_DIR/logs/"
exit 1
