import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const DEFAULT_COLORS = {
    background: '#574964',
    color1: '#9F8383',
    color2: '#C8AAAA',
    text: '#FFDAB3',
};

export function ColourSchemeProvider() {
    const { props } = usePage<{ colorScheme?: typeof DEFAULT_COLORS }>();
    const colorScheme = props.colorScheme ?? DEFAULT_COLORS;

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--portfolio-bg', colorScheme.background);
        root.style.setProperty('--portfolio-color1', colorScheme.color1);
        root.style.setProperty('--portfolio-color2', colorScheme.color2);
        root.style.setProperty('--portfolio-text', colorScheme.text);
    }, [colorScheme.background, colorScheme.color1, colorScheme.color2, colorScheme.text]);

    return null;
}