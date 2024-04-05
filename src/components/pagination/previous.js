import { isEmpty } from 'lodash';
import Link from 'next/link';

const Previous = ({ currentPageNo, postName }) => {

	if (!currentPageNo || isEmpty(postName)) {
		return null;
	}

	// If you are on the first page, don't show previous link.
	if (0 === currentPageNo - 1) {
		return null;
	}

	const paginationLink = `/${postName}/page/${currentPageNo - 1}/`;

	return (
		<Link href={paginationLink} legacyBehavior>
			<a className="inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800"><i className="fa-sharp fa-solid fa-chevron-left"></i></a>
		</Link>
	);
};

export default Previous;
