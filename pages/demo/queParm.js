import { concat } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';

export default function queParm() {
  const router = useRouter();
  const { myData } = router.query;
  const [data, setData] = useState()
  console.log('router',router);
  console.log('pathname',router.pathname);
  console.log('query',router.query);
  useEffect(() => {
      if (myData) setData(myData);
    }, [router.query]);
  return (
    <div>
      <p>Received data: {data}</p>
    </div>
  );
}
