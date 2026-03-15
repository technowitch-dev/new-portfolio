import { Head, Link } from '@inertiajs/react';
interface ErrorPageProps {
    status: number;
}

const titles: Record<number, string> = {
    403: '403: Forbidden',
    404: '404: Page Not Found',
    500: '500: Server Error',
    503: '503: Service Unavailable',
};

const descriptions: Record<number, string> = {
    403: 'Sorry, you are not an authorized spellcaster and thus you are unable to access this page.',
    404: 'Sorry, we searched through our archives and manuscripts, but we couldn\'t find the page you are looking for.',
    500: 'Whoops, something went wrong in our scroll archives we will try to resolve this issue as soon as possible.',
    503: 'Sorry, we are tidying up our scroll archives. Please try again later.',
};

export default function ErrorPage({ status }: ErrorPageProps) {
    const title = titles[status] ?? 'Error';
    const description = descriptions[status] ?? 'Uh oh! Something went wrong.';

    return (
        <div className="py-8 text-center">
                <h1 className="text-6xl font-bold text-portfolio-text mb-4">{status}</h1>
                <h2 className="text-2xl text-portfolio-text mb-4">{title}</h2>
                <p className="text-portfolio-text mb-8 max-w-md mx-auto">{description}</p>
                <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-portfolio-color1 text-portfolio-text rounded-lg hover:opacity-90 transition"
                >
                    Back to Home
                </Link>
            </div>
    );
}