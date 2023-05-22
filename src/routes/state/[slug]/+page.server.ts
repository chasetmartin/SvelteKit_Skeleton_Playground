import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ params }) => {
    if (params.slug === 'arizona') {
        return {
            title: 'Arizona',
            content: 'Arizona Content'
        };
    }

    throw error(404, 'Not found');
}) satisfies PageServerLoad;