#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:-audio}"
LOCALE="${2:-pt-BR}"

mkdir -p "$OUT_DIR/$LOCALE/digits" "$OUT_DIR/$LOCALE/noise"

# 1) Gera dígitos 0-9 como WAV (16kHz, mono) - bom pra voz
# Nota: pt-BR no espeak-ng geralmente é "pt" (e não "pt-BR").
# Se "pt" ficar estranho, dá pra testar "pt" e "pt+f3" etc.
VOICE="pt"

for d in 0 1 2 3 4 5 6 7 8 9; do
  espeak-ng -v "$VOICE" -s 140 -p 50 -a 180 -w "$OUT_DIR/$LOCALE/digits/$d.wav" "$d"
  # padroniza sample rate + mono (pra consistência no WebAudio)
  sox "$OUT_DIR/$LOCALE/digits/$d.wav" -r 16000 -c 1 "$OUT_DIR/$LOCALE/digits/$d.tmp.wav"
  mv "$OUT_DIR/$LOCALE/digits/$d.tmp.wav" "$OUT_DIR/$LOCALE/digits/$d.wav"
done

# 2) Gera ruído branco de fundo (30s) e normaliza levemente
# Você pode trocar "white" por "pink" se preferir: synth ... pinknoise
sox -n -r 48000 -c 1 "$OUT_DIR/$LOCALE/noise/background.wav" synth 30 whitenoise vol 0.15

echo "✅ Gerado em: $OUT_DIR/$LOCALE"
