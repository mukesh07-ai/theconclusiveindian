import os
import sys

# Ensure backend directory is in sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# For local testing when Hostinger MySQL is not local
if "TEST_DATABASE_URL" in os.environ:
    os.environ["DATABASE_URL"] = os.environ["TEST_DATABASE_URL"]
elif os.environ.get("USE_LOCAL_MYSQL_FOR_TESTS", "true").lower() == "true":
    os.environ["DATABASE_URL"] = "mysql+aiomysql://root:MYSQLTEST@127.0.0.1:3306/theconclusiveindian_db?charset=utf8mb4"
