import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSingleProductBreadcrumbs } from '../utils/customjs/custome';

const convertBreadcrumb = string => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

const Breadcrumbs = ({pageData = ''}) => {
  const {categories} =  pageData;
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(getSingleProductBreadcrumbs(categories));
  
  useEffect(() => {
    if (router && (pageData == '')) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();
      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });
      pathArray.splice(-1,1)
      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }
  
if(breadcrumbs[0]?.breadcrumb != '')
{
  return (
    <nav aria-label="breadcrumbs">
      <ol className="breadcrumb">
        <li>
          <Link href="/">HOME</Link>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <li key={breadcrumb.href}>
              <Link href={breadcrumb.href}>
                
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}else{
  return null;
}
  
};

export default Breadcrumbs;