export type ContactLink = {
	label: string;
	href: string;
};

/**
 * Sample content for the site foundation (initiative 0001). Not production copy —
 * see docs/product/initiatives/0001-build-website-foundation/brief.md.
 */
export const contactLinks: ContactLink[] = [
	{ label: 'Sample email', href: 'mailto:sample@example.com' },
	{ label: 'Sample GitHub profile', href: 'https://github.com/example' },
	{ label: 'Sample LinkedIn profile', href: 'https://www.linkedin.com/in/example' },
];
