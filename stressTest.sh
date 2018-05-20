#!/bin/bash
for number in {1..1000000}
do
echo "$number "
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://api.dev.livechek.com/insurance_companies/59ae5ea4b695192929206f40/mis\?product\=AIP\&start\=1520419000000\&end\=1520419261584 | grep "HTTP/1.1 " &
done
exit 0
