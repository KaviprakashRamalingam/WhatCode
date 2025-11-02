#!/bin/bash

# Setup script to configure Java 21 for WhatCode Backend
# Run this before building/running the backend: source setup-java.sh

export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"

echo "Java environment configured for WhatCode Backend"
echo "Java version:"
java -version
echo ""
echo "To use this configuration in your current terminal, run:"
echo "  source backend/setup-java.sh"

