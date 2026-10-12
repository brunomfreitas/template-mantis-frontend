import { useEffect, useState } from 'react';
import axios from 'utils/api';
// ==============================|| CONFIG - HOOKS  ||============================== //

const usePermissions = (app) => {
    const [state, setState] = useState({
        loading: true,
        canRead: false,
        canCreate: false,
        canEdit: false,
        canDelete: false
    });

    useEffect(() => {
        let alive = true;

        async function listar() {
            try {
                const resp = await axios.post('/auth/permissions', { app });
                const p = resp?.data ?? {};

                if (!alive) return;

                setState({
                    loading: false,
                    canRead: !!p.cs_ler,
                    canCreate: !!p.cs_criar,
                    canEdit: !!p.cs_editar,
                    canDelete: !!p.cs_excluir
                });
            } catch (e) {
                if (!alive) return;
                setState((s) => ({ ...s, loading: false }));
            }
        }

        listar();
        return () => {
            alive = false;
        };
    }, [app]);

    return state;
};

export default usePermissions;
