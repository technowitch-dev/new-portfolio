import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React, { createElement } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ColourSchemeProvider } from './components/colour-scheme-provider';
import Fireflies from './components/fireflies';
import { initializeTheme } from './hooks/use-appearance';
import type { PageProps } from '@inertiajs/core';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const module = await resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        );
        const Page = (module as { default: React.ComponentType<PageProps> }).default;
        return (props: PageProps) =>
            createElement(
                () => (
                    <>
                        <ColourSchemeProvider />
                        {createElement(Page, props)}
                    </>
                ),
            );
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <>
                    <Fireflies />
                    <App {...props} />
                </>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();