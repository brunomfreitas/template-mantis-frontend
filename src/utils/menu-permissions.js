// Remove acentos, baixa, padroniza e tira ".menu"
const normalize = (s) =>
    String(s ?? '')
        .toLowerCase()
        .replace(/\.menu$/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const getCandidates = (item) => {
    const id = item?.id;
    const titleId = item?.title?.props?.id;
    const urlTail = item?.url ? item.url.split('/').filter(Boolean).pop() : undefined;

    return [id, titleId, urlTail].filter(Boolean).map(normalize);
};

/**
 * NOVO: monta um Set com as aplicações que o usuário pode LER.
 * permission item:
 * {
 *   cd_aplicacao: "usuario",
 *   nm_aplicacao: "Usuários",
 *   cs_ler: true,
 *   ...
 * }
 */
const makeAllowedSet = (permissions) => {
    const keys = new Set();

    for (const p of permissions || []) {
        if (!p?.cs_ler) continue;

        const kCode = normalize(p?.cd_aplicacao);
        const kName = normalize(p?.nm_aplicacao);

        if (kCode) keys.add(kCode);
        if (kName) keys.add(kName);
    }

    return keys;
};

// filtra recursivamente sem mutar
const filterTree = (node, allowed) => {
    if (!node) return null;

    if (node.type === 'item') {
        const candidates = getCandidates(node);
        const ok = candidates.some((c) => allowed.has(c));
        return ok ? { ...node } : null;
    }

    // group / collapse
    const children = (node.children || []).map((child) => filterTree(child, allowed)).filter(Boolean);

    if (children.length === 0) return null;
    return { ...node, children };
};

// API principal
export const filterMenuItems = (menuConfig, permissions) => {
    const allowed = makeAllowedSet(permissions);
    const items = (menuConfig?.items || []).map((group) => filterTree(group, allowed)).filter(Boolean);

    return { items };
};
