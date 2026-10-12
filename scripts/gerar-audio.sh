#!/usr/bin/env bash
set -euo pipefail

TEXTO="${1:-}"
DB="${2:-0}"
ARQUIVO="${3:-}"

VOICE="pt+f3"
SPEED="135"
PITCH="42"
AMPLITUDE="120"

if [[ -z "$TEXTO" || -z "$ARQUIVO" ]]; then
  echo "Uso:"
  echo "scripts/gerar-audio.sh \"texto\" \"db\" \"arquivo.wav\""
  exit 1
fi

mkdir -p "$(dirname "$ARQUIVO")"

TMP_FILE="$(mktemp --suffix=.wav)"
TMP_PAD="$(mktemp --suffix=.wav)"

echo "Gerando áudio..."
echo "Texto: $TEXTO"
echo "Volume: ${DB}dB"
echo "Arquivo: $ARQUIVO"

# gera fala com nível base mais baixo
espeak-ng -v "$VOICE" -s "$SPEED" -p "$PITCH" -a "$AMPLITUDE" -w "$TMP_FILE" "$TEXTO"

# cria headroom antes do resample
sox "$TMP_FILE" "$TMP_PAD" gain -3

# aplica sample rate final + ganho desejado
sox "$TMP_PAD" -r 16000 -c 1 "$ARQUIVO" gain "$DB"

rm -f "$TMP_FILE" "$TMP_PAD"

echo "✅ Áudio gerado: $ARQUIVO"