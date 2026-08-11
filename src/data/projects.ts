export type ProjectLink = {
	label: string;
	href: string;
};

export type Project = {
	title: string;
	summary: string;
	tags: string[];
	links: ProjectLink[];
};

/**
 * Sample content for the site foundation (initiative 0001). Not production copy —
 * see docs/product/initiatives/0001-build-website-foundation/brief.md.
 */
export const projects: Project[] = [
	{
		title: 'Ledger sync engine (sample)',
		summary:
			'Reconciles tens of thousands of daily transactions across three currencies with no server component.',
		tags: ['TypeScript', 'CRDTs', 'Cloudflare Workers'],
		links: [
			{ label: 'Sample repository', href: 'https://github.com/example/ledger-sync-sample' },
			{ label: 'Sample write-up', href: 'https://example.com/projects/ledger-sync-sample' },
		],
	},
	{
		title: 'Static site pipeline (sample)',
		summary: 'A rebuilt deploy pipeline aiming for sub-second cold starts on the edge.',
		tags: ['Rust', 'WASM'],
		links: [
			{ label: 'Sample repository', href: 'https://github.com/example/static-pipeline-sample' },
		],
	},
	{
		title: 'Terminal-first notes tool (sample)',
		summary: 'A note-taking tool that lives entirely in the terminal, synced over git.',
		tags: ['Go', 'CLI'],
		links: [
			{ label: 'Sample repository', href: 'https://github.com/example/terminal-notes-sample' },
			{ label: 'Sample demo', href: 'https://example.com/projects/terminal-notes-sample' },
		],
	},
];
