# autofix.sh
#!/bin/bash
npm test
while [ $? -ne 0 ]; do
  # Pedir a Cursor que intente arreglar el problema
  echo "Fixing test failures..."
  npm install --force
  npm test
done