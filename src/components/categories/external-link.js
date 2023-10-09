import Link from 'next/link';

const ExternalLink = ( { url, text } ) => {
	
	if ( ! url || ! text ) {
		return null;
	}
	
	return <Link href={ url }>
			{ text }
	</Link>;
};

export default ExternalLink;
