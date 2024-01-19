import axios from "axios";
import { PAGES_URL } from "../constants/endpoints";

export const getPagesAPI = async () => {
	return await axios.post(PAGES_URL)
		.then( res => {
            const {data} = res;
           if ( '200' === data.code ) {
				return data.result;
			} else {
				return [];
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return [];
		} );
};