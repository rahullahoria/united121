import { Headers } from '@angular/http';

export var contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

let apiUrls = [ "http://192.168.43.99:3000/",
				"http://api.united121.shatkonlabs.com/api/", 
			   	"https://api.test.livechek.com/", 
               	"https://api.stag.livechek.com/", 
               	"https://api.livechek.com/" ]

export const apiBaseUrl = apiUrls[1];
