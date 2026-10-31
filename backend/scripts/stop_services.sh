#!/usr/bin/env bash
# ==============================================================================
# The Conclusive Indian — Stop All Microservices & API Gateway
# ==============================================================================

echo "🛑 Stopping all Conclusive Indian microservices on ports 8000-8007..."
for PORT in 8000 8001 8002 8003 8004 8005 8006 8007; do
    PID=$(lsof -ti :$PORT 2>/dev/null || true)
    if [ -n "$PID" ]; then
        echo "   Killing process $PID on port $PORT..."
        kill -9 $PID 2>/dev/null || true
    fi
done

echo "✅ All microservices stopped successfully."
