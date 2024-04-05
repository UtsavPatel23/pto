const PostMeta = ({ date, authorName }) => {
	return (
		<div className="font-medium mb-2 border border-victoria-600 p-1 w-fit bg-victoria-100">
			<time className='' dateTime={date || ''}>{date || ''}</time>
			<span className="ml-2"><span className="italic mr-2">by</span>{authorName || ''}</span>
		</div>
	);
}

export default PostMeta;