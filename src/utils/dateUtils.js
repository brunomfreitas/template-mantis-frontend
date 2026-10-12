import { format as dfFormat, isValid, parseISO } from 'date-fns';

// Formatos padrão do projeto (centraliza pra manter consistência)
export const DATE_BR = 'dd/MM/yyyy';
export const DATETIME_BR = 'dd/MM/yyyy HH:mm';
export const DATE_INPUT = 'yyyy-MM-dd';
export const DATETIME_INPUT = "yyyy-MM-dd'T'HH:mm"; // para input type="datetime-local"

/**
 * Converte ISO (string) -> string formatada.
 * Ex: isoToFormat(iso, 'dd/MM/yyyy HH:mm')
 */
export function isoToFormat(iso, fmt = DATE_BR) {
    if (!iso || typeof iso !== 'string') return '';

    try {
        const date = parseISO(iso);
        if (!isValid(date)) return '';
        return dfFormat(date, fmt);
    } catch {
        return '';
    }
}

/**
 * Atalhos mais usados
 */
export function isoToBr(iso) {
    return isoToFormat(iso, DATE_BR);
}

export function isoToBrDateTime(iso) {
    return isoToFormat(iso, DATETIME_BR);
}

/**
 * ISO -> yyyy-MM-dd para input type="date"
 * Mantém a data "crua" do backend e evita bug de timezone.
 */
export function isoToInputDate(iso) {
    if (!iso || typeof iso !== 'string') return '';
    return iso.split('T')[0] || '';
}

/**
 * ISO -> yyyy-MM-ddTHH:mm para input type="datetime-local"
 * (também evita timezone usando substring do ISO)
 */
export function isoToInputDateTimeLocal(iso) {
    if (!iso || typeof iso !== 'string') return '';
    // ISO: 2026-02-22T13:33:19.873Z -> pega até minutos: 2026-02-22T13:33
    return iso.slice(0, 16);
}

/**
 * Converte "dd/MM/yyyy" ou "dd/MM/yyyy HH:mm" -> ISO (UTC)
 * - Se vier só data: assume 00:00
 * - Se vier data e hora: usa HH:mm
 *
 * Opção: timeZoneSafe=true cria ISO em UTC baseado nos valores numéricos
 * (não sofre conversão de fuso na criação).
 */
export function brToIso(br, { withTime = false } = {}) {
    if (!br || typeof br !== 'string') return null;

    try {
        const [datePart, timePart] = br.trim().split(' ');
        const [day, month, year] = (datePart || '').split('/').map(Number);

        if (!day || !month || !year) return null;

        let hours = 0;
        let minutes = 0;

        if (withTime) {
            const [h, m] = (timePart || '').split(':').map(Number);
            if (Number.isNaN(h) || Number.isNaN(m)) return null;
            hours = h;
            minutes = m;
        }

        // Cria em UTC para não depender do timezone do navegador
        const dt = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0));
        if (!isValid(dt)) return null;

        return dt.toISOString();
    } catch {
        return null;
    }
}

/**
 * Conveniências
 */
export function brDateToIso(brDate) {
    return brToIso(brDate, { withTime: false });
}

export function brDateTimeToIso(brDateTime) {
    return brToIso(brDateTime, { withTime: true });
}
