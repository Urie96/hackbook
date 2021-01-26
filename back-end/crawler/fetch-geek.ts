import { partial, requester } from './tools';
import {
  Article,
  Course,
  CourseDescription,
  Section,
  ArticleContent,
  ArticleComment,
} from '../models';
import { init, has, save } from './dao';

const cookies = [
  '',
  '',
  '',
  '',
  'Hm_lvt_f83d162eeb1abea371d41d4b60d345db=1605087373; gksskpitn=2dadbf4d-56c4-416c-8819-7962dee3f4b7; _ga=GA1.2.965430510.1611554450; _gid=GA1.2.1238150340.1611554450; LF_ID=1611554449880-5246505-1484562; sajssdk_2015_cross_new_user=1; GCID=78c28f3-c4381a4-fd897e9-639d47a; GRID=78c28f3-c4381a4-fd897e9-639d47a; _gat=1; GCESS=BQwBAQcEaWcwvQQEAC8NAAEIlngdAAAAAAADBOuFDmACBOuFDmALAgUACgQAAAAACAEDBQQAAAAABgSo0hU6CQEB; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1611564525|1611559691; gk_process_ev={%22referrer%22:%22%22%2C%22utime%22:1611564478710%2C%22count%22:42%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611560747,1611562954,1611563460,1611564526; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611564526; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611562968,1611563460,1611563553,1611564526; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611564526; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221931414%22%2C%22first_id%22%3A%2217738ac4e2f8b9-0593e353b510d7-5437971-304500-17738ac4e308af%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%2217738216a1f2aa-0dceafef949d6e-326f7007-1296000-17738216a20a1d%22%7D',
  'gksskpitn=d5281b6f-26e7-4ad1-97ef-a43f81bec24b; LF_ID=1611555516579-6027733-9943774; sajssdk_2015_cross_new_user=1; _ga=GA1.2.1318436588.1611555517; _gid=GA1.2.323462475.1611555517; GCID=19ccc17-6cc4ca5-6b1e0da-229a0b7; GRID=19ccc17-6cc4ca5-6b1e0da-229a0b7; _gat=1; GCESS=BQwBAQcEt6JYzAQEAC8NAAoEAAAAAAUEAAAAAAkBAQIE34cOYAgBAwME34cOYAEI36AdAAAAAAALAgUABgRl.NdC; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1611565024|1611564994; gk_process_ev={%22referrer%22:%22https://time.geekbang.org/%22%2C%22utime%22:1611565018934%2C%22count%22:3%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611555517,1611564996,1611565026; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611565026; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611555517,1611564996,1611565026; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611565026; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221941727%22%2C%22first_id%22%3A%221773831b0e6782-08f5d2dd73b81-326f7007-1296000-1773831b0e7aa3%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773831b0e6782-08f5d2dd73b81-326f7007-1296000-1773831b0e7aa3%22%7D',
  'gksskpitn=d5281b6f-26e7-4ad1-97ef-a43f81bec24b; LF_ID=1611555516579-6027733-9943774; sajssdk_2015_cross_new_user=1; _ga=GA1.2.1318436588.1611555517; _gid=GA1.2.323462475.1611555517; GCID=19ccc17-6cc4ca5-6b1e0da-229a0b7; GRID=19ccc17-6cc4ca5-6b1e0da-229a0b7; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611555517,1611564996,1611565026; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611555517,1611564996,1611565026; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611565068; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611565068; GCESS=BQUEAAAAAAEIPacdAAAAAAAMAQEDBEOJDmACBEOJDmAIAQMKBAAAAAALAgUABwRAdDMWBgRl.NdCCQEBBAQALw0A; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1611565381|1611564994; gk_process_ev={%22referrer%22:%22%22%2C%22utime%22:1611565084474%2C%22count%22:8%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221943357%22%2C%22first_id%22%3A%221773831b0e6782-08f5d2dd73b81-326f7007-1296000-1773831b0e7aa3%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773831b0e6782-08f5d2dd73b81-326f7007-1296000-1773831b0e7aa3%22%7D',
  '_ga=GA1.2.2096929720.1611569345; _gid=GA1.2.1219653817.1611569345; LF_ID=1611569345053-3462281-3232132; GCID=d2df383-c794947-2383655-517337d; sajssdk_2015_cross_new_user=1; gksskpitn=9b6586b0-7aa3-4e9b-9c65-7d3bfc0a7b9d; GRID=d2df383-c794947-2383655-517337d; GCESS=BQME1JgOYAUEAAAAAAwBAQQEAC8NAAIE1JgOYAcElCndVAEI7WkhAAAAAAAIAQMJAQELAgUABgR3O9asCgQAAAAA; SERVERID=3431a294a18c59fc8f5805662e2bd51e|1611569387|1611569345; _gat=1; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611569412; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611569412; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611569412; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611569412; gk_process_ev={%22count%22:3%2C%22utime%22:1611569354557%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222189805%22%2C%22first_id%22%3A%221773904b3dd3ea-024d80e097af3b-5437971-304500-1773904b3de3bf%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773904b3dd3ea-024d80e097af3b-5437971-304500-1773904b3de3bf%22%7D',
  'LF_ID=1611626981430-665239-612638; _ga=GA1.2.1670010577.1611626982; _gid=GA1.2.183598548.1611626982; _gat=1; GCID=376cfc3-914365d-c5f9792-097248a; sajssdk_2015_cross_new_user=1; gksskpitn=56856fb1-1016-414e-9fd9-a4f7b29b8ac1; GRID=376cfc3-914365d-c5f9792-097248a; GCESS=BQgBAwMEBXoPYAcEOiKDwAYE4sTtWQIEBXoPYAQEAC8NAAoEAAAAAAUEAAAAAAkBAQwBAQsCBQABCCKBIQAAAAAA; SERVERID=3431a294a18c59fc8f5805662e2bd51e|1611627016|1611626993; gk_process_ev={%22count%22:3%2C%22utime%22:1611627000059%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611627018; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611627018; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611627019; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611627019; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222195746%22%2C%22first_id%22%3A%221773c742c131c8-01efb8f3e265c-326f7007-1296000-1773c742c149f0%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773c742c131c8-01efb8f3e265c-326f7007-1296000-1773c742c149f0%22%7D',
  'LF_ID=1611627063715-8435636-105306; sajssdk_2015_cross_new_user=1; _ga=GA1.2.865685530.1611627064; _gid=GA1.2.390945492.1611627064; _gat=1; GCID=2822c50-dcffc94-591008d-63c72bb; gksskpitn=2b2fdc22-e2f4-4c95-98a0-e3d015b1927c; GRID=2822c50-dcffc94-591008d-63c72bb; GCESS=BQkBAQgBAwEIMIEhAAAAAAAKBAAAAAAHBP6q6mYLAgUABAQALw0ADAEBBQQAAAAAAgRPeg9gAwRPeg9gBgQAI.6d; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1611627090|1611627068; gk_process_ev={%22count%22:3%2C%22utime%22:1611627083290%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222195760%22%2C%22first_id%22%3A%221773c756a79b42-09405d35543f5c-326f7007-1296000-1773c756a7a9d5%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773c756a79b42-09405d35543f5c-326f7007-1296000-1773c756a7a9d5%22%7D',
  'LF_ID=1611627130751-7038205-2743629; sajssdk_2015_cross_new_user=1; GCID=65de47e-da32f0d-1dabe83-7aaacbb; _ga=GA1.2.2008667132.1611627131; _gid=GA1.2.414053319.1611627131; _gat=1; gksskpitn=7c55dbb7-13a5-4d45-a69e-460be9e4833b; GRID=65de47e-da32f0d-1dabe83-7aaacbb; GCESS=BQQEAC8NAAcEYNCEJAwBAQoEAAAAAAIEiXoPYAYEbZHeDwMEiXoPYAEIOoIhAAAAAAAIAQMJAQELAgUABQQAAAAA; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1611627146|1611627131; gk_process_ev={%22count%22:3%2C%22utime%22:1611627134676%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611627148; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611627148; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611627148; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611627148; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222196026%22%2C%22first_id%22%3A%221773c767049c2e-071a69ca16aff6-326f7007-1296000-1773c76704a9c8%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773c767049c2e-071a69ca16aff6-326f7007-1296000-1773c76704a9c8%22%7D',
  'LF_ID=1611627184411-9500799-3363110; sajssdk_2015_cross_new_user=1; _ga=GA1.2.1095986333.1611627185; _gid=GA1.2.1035757835.1611627185; _gat=1; GCID=5b395ea-dbed63d-785dfc2-5c7889a; gksskpitn=18d7bb69-7d17-4e31-ab43-2a9d2bdd3d19; GRID=5b395ea-dbed63d-785dfc2-5c7889a; GCESS=BQQEAC8NAAEIjoIhAAAAAAAIAQMGBBARFXgJAQEHBE25BW0LAgUADAEBCgQAAAAABQQAAAAAAwS4eg9gAgS4eg9g; SERVERID=3431a294a18c59fc8f5805662e2bd51e|1611627194|1611627185; gk_process_ev={%22count%22:3%2C%22utime%22:1611627186024%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222196110%22%2C%22first_id%22%3A%221773c774290b18-0a0ddea0bfb656-5437971-304500-1773c774291ae3%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773c774290b18-0a0ddea0bfb656-5437971-304500-1773c774291ae3%22%7D; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611627196; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611627196',
  'LF_ID=1611627225651-4230172-5112671; sajssdk_2015_cross_new_user=1; GCID=36a1630-79a7e88-a5a28dc-e6ddd77; _ga=GA1.2.694949222.1611627227; _gid=GA1.2.1970841900.1611627227; _gat=1; gksskpitn=c504b3d1-266e-4cf9-84d9-cf11d6d05f5b; GRID=36a1630-79a7e88-a5a28dc-e6ddd77; GCESS=BQcEdIJUNAkBAQUEAAAAAAEImIIhAAAAAAAIAQMKBAAAAAAEBAAvDQAGBDC9NioMAQELAgUAAgTkeg9gAwTkeg9g; SERVERID=3431a294a18c59fc8f5805662e2bd51e|1611627237|1611627226; gk_process_ev={%22count%22:3%2C%22utime%22:1611627232425%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611627239; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611627239; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611627239; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611627239; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222196120%22%2C%22first_id%22%3A%221773c77e40f988-0b76d30099a1d8-5437971-304500-1773c77e410aa6%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773c77e40f988-0b76d30099a1d8-5437971-304500-1773c77e410aa6%22%7D',
  'LF_ID=1611627274872-6299372-6153607; sajssdk_2015_cross_new_user=1; GCID=7e8b2b8-f143f48-ead5ace-5138473; _ga=GA1.2.887158039.1611627276; _gid=GA1.2.578331954.1611627276; _gat=1; gksskpitn=b954de7c-930a-4e37-9e99-566cd0d25390; GRID=7e8b2b8-f143f48-ead5ace-5138473; GCESS=BQMEEnsPYAIEEnsPYAcEkPQS5wEIooIhAAAAAAAKBAAAAAAJAQEEBAAvDQAMAQELAgUABQQAAAAABgTcWPpECAED; SERVERID=3431a294a18c59fc8f5805662e2bd51e|1611627283|1611627275; gk_process_ev={%22count%22:3%2C%22utime%22:1611627279029%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611627285; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611627285; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611627285; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611627285; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222196130%22%2C%22first_id%22%3A%221773c78a34b6d7-07db438e237482-5437971-304500-1773c78a34caa9%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773c78a34b6d7-07db438e237482-5437971-304500-1773c78a34caa9%22%7D',
  'LF_ID=1611627322985-9047854-2300968; sajssdk_2015_cross_new_user=1; _ga=GA1.2.2097429403.1611627323; _gid=GA1.2.2090358459.1611627323; _gat=1; GCID=0da5aa5-36c8381-45bab77-0d63b9a; gksskpitn=84ec61c4-af38-44a4-b11a-8f5a0319c656; GRID=0da5aa5-36c8381-45bab77-0d63b9a; GCESS=BQkBAQQEAC8NAAMEQ3sPYAEItYIhAAAAAAALAgUABQQAAAAABgSzcHdSBwTa4nSVAgRDew9gCgQAAAAADAEBCAED; SERVERID=3431a294a18c59fc8f5805662e2bd51e|1611627332|1611627322; gk_process_ev={%22count%22:3%2C%22utime%22:1611627326765%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22%2C%22referrerTarget%22:%22page_geektime_login%22}; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611627334; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611627334; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611627334; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611627334; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222196149%22%2C%22first_id%22%3A%221773c795ed6db-0fe6b5c46592f6-5437971-304500-1773c795ed73fd%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773c795ed6db-0fe6b5c46592f6-5437971-304500-1773c795ed73fd%22%7D',
  'LF_ID=1611627366657-3841242-4605730; sajssdk_2015_cross_new_user=1; _ga=GA1.2.8174366.1611627367; _gid=GA1.2.528418299.1611627367; _gat=1; GCID=a87eeb6-dcc1e48-7760889-950f67b; GRID=a87eeb6-dcc1e48-7760889-950f67b; gksskpitn=07fab7a0-0934-43ee-93f6-fa333203f91a; GCESS=BQQEAC8NAAgBAwMEbnsPYAEI14IhAAAAAAAGBG9recECBG57D2AJAQEFBAAAAAAKBAAAAAAMAQELAgUABwSkeKSD; SERVERID=3431a294a18c59fc8f5805662e2bd51e|1611627375|1611627366; gk_process_ev={%22count%22:2%2C%22utime%22:1611627366855%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22}; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611627377; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611627377; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611627377; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611627377; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222196183%22%2C%22first_id%22%3A%221773c7a0a26377-0c6dc0e3c24427-5437971-304500-1773c7a0a27ab7%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773c7a0a26377-0c6dc0e3c24427-5437971-304500-1773c7a0a27ab7%22%7D',
  'sajssdk_2015_cross_new_user=1; _ga=GA1.2.698134060.1611627402; _gid=GA1.2.656027483.1611627402; _gat=1; LF_ID=1611627402830-8233215-5768345; GCID=1711a91-2c0925e-fc55348-618bf15; gksskpitn=0a61e51b-bf61-4b13-b7fa-cb3c29522aef; GRID=1711a91-2c0925e-fc55348-618bf15; GCESS=BQMEj3sPYAgBAwYEUVPvJgIEj3sPYAoEAAAAAAUEAAAAAAEIL4MhAAAAAAAMAQELAgUABwRwdC4OCQEBBAQALw0A; SERVERID=3431a294a18c59fc8f5805662e2bd51e|1611627409|1611627402; gk_process_ev={%22count%22:2%2C%22utime%22:1611627402953%2C%22referrer%22:%22%22%2C%22target%22:%22page_geektime_login%22}; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1611627411; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1611627411; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222196271%22%2C%22first_id%22%3A%221773c7a9128ae1-03eae2f2d152d1-5437971-304500-1773c7a9129a27%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%7D%2C%22%24device_id%22%3A%221773c7a9128ae1-03eae2f2d152d1-5437971-304500-1773c7a9129a27%22%7D; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1611627411; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1611627411',
];

const header = {
  Origin: 'https://time.geekbang.org',
  Cookie: cookies[16],
};

const toGeekId = (id: any) => (id ? 'G' + id : undefined);

const { post } = requester(header);

main();

async function main() {
  await init();
  // await login(
  //   13890394108,
  //   '%7B%22a%22%3A%22FFFF0N00000000009834%22%2C%22c%22%3A%221611564478809%3A0.067187253104523%22%2C%22d%22%3A%22nvc_message_h5%22%2C%22j%22%3A%7B%22test%22%3A1%7D%2C%22h%22%3A%7B%22umidToken%22%3A%22T2gADFCGpaVgbhayqpc4ikNQBRcSb00TlLWTic086dl99rGyr7Y_nLOZZ7n_jd36xiM%3D%22%7D%2C%22b%22%3A%22140%23rpFxl%2BM4zzZYwQo24xrFK3N8s7O3Z26TeISx5pvPBzGPV5LZwkiKTHfazdNj7eYH5uN1Snz6okoqlbzx6v5Izn6kzFnsbXDOlpTzzPzbVXl%2FlbnTC8c3V36ezzrb2XMexG%2F2ONdOHaU%2BWFuMP1Jgh74vdvnpmAygb8J%2F4ftYUejanVIhq3SoFg8Y%2BSxaTKNtyBr%2BYTrx2cyP%2FdFn4VGH%2FDondbiAEiXMrOjVDX%2BRew0DiEnVUav%2FFpob%2BQrzY4aj7BXO2fKQ%2Bltx6es8zTwg7q7pc2MrEdoJsSaXXjGIcHGpIbu8gbHS1%2F4wRrba8L%2BpxDjXAxn0o%2BvoZzzOAQx5RYyTAVwlGwKRrjatXam%2FqQC99SzzvJyOeMpIKFIN%2BvKZOIG8%2FpFF1vhBYVsuy9yG8mQIOtQfcvUOdbe1tOixM5%2Bxj6XHdfzczYPRmAD44P%2FnWuKyfet3CQ%2BFY7X%2FvdifQIr4dMoZoqW8sic97rLyuV%2FUaWeslbS9xy0mULQt1jkvkZeIHzGwP6d60H%2FPufrI%2BkzWFqbNtnYHT5YxEqskmkFO0woG%22%2C%22e%22%3A%22KCQ06fQXvwviEsl7_Ntg_DgovqJusg3JuB8fyZRauM4vHU7GcUVBCRbFQ6TYW-vWtpo1yQ2LjvAGY1-QJDw9jbK-mUbfOuazHjdO0GI6f6pTz4GPW1M-SKI60yLwrCIJsv0ZnyIfzBGBx5haezinFiLVEPrnUUciWroSEn9FisPO8O_wabIa26HO5-kYxxHrVXELYfI4VbiVoCXHjjCyJXwoPNlxMLuXdZ-VT3sok9g%22%2C%22i%22%3Atrue%7D'
  // );
  const url = 'https://time.geekbang.org/serv/v3/lecture/list';
  const data = await post(url, {
    label_id: 0,
    type: 1,
  });
  data.body.data.list
    // .slice(2, 3)
    .map((v) => v.pid)
    .forEach(async (id) => {
      // await saveCourseInfo(id);
      // await saveSections(id);
      await saveArticles(id);
    });
}

async function saveCourseInfo(id: string) {
  const url = 'https://time.geekbang.org/serv/v1/column/intro';
  const data = await post(url, { cid: id });
  const course = new Course();
  const v = data.body.data;
  course.id = toGeekId(id);
  course.title = v.column_title;
  course.teacherName = v.author_name;
  course.teacherTitle = v.author_intro;
  course.price = v.column_price / 100;
  course.brief = v.column_subtitle;
  course.image = v.lecture_url;
  course.articleCount = v.article_count;
  course.purchasedCount = v.sub_count;
  await save(course);
  const description = new CourseDescription();
  description.content = v.column_intro;
  description.courseId = course.id;
  await save(description);
}

async function saveSections(id: string) {
  const url = `https://time.geekbang.org/serv/v1/chapters`;
  const res = await post(url, { cid: id });

  for (const v of res.body.data) {
    const section = new Section();
    section.id = toGeekId(v.id);
    section.title = v.title;
    section.courseId = toGeekId(id);
    await save(section);
  }
}

async function saveArticles(courseId: string) {
  const url = `https://time.geekbang.org/serv/v1/column/articles`;
  const res = await post(url, {
    cid: courseId,
    order: 'earliest',
    prev: 0,
    sample: false,
    size: 500,
  });
  res.body.data.list.forEach(async (v) => {
    const article = new Article();
    article.id = toGeekId(v.id);
    if (v.chapter_id === '0') {
      // 极客时间部分专栏没有section，需要创建以关联article
      const sectionId = toGeekId(courseId) + 'ORPHAN';
      const section = await Section.findOne(sectionId);
      if (!section) {
        const sec = new Section();
        sec.courseId = toGeekId(courseId);
        sec.id = sectionId;
        sec.title = '';
        await save(sec);
      }
      article.sectionId = sectionId;
    } else {
      article.sectionId = toGeekId(v.chapter_id);
    }
    article.title = v.article_title;
    article.publishDate = new Date(
      1000 * Number(v.article_ctime)
    ).toLocaleDateString();
    await save(article);
    saveArticleContent(v.id);
    // saveComments(article, v.id);
  });
}

async function saveArticleContent(id: string) {
  if (has({ articleContentId: toGeekId(id) })) return;
  const url = 'https://time.geekbang.org/serv/v1/article';
  const res = await post(url, {
    id,
    is_freelyread: true,
  });
  if (!res) {
    console.log(id, 'empty response');
    return;
  }
  if (!Array.isArray(res.body.error)) {
    console.log(id, 'not purchased');
    return;
  }
  const content = new ArticleContent();
  content.articleId = toGeekId(id);
  content.content = res.body.data.article_content;
  await save(content);
  console.log(id, '爬取成功');
}

async function saveComments(article: Article, id: string) {
  const url = 'https://time.geekbang.org/serv/v1/comments';
  const res = await post(url, {
    aid: id,
    prev: 0,
  });
  res.body.data.list.forEach(async (v) => {
    const comment = new ArticleComment();
    comment.id = toGeekId(v.id);
    comment.nickName = v.user_name;
    comment.likeCount = v.like_count;
    comment.content = v.comment_content;
    comment.article = article;
    await save(comment);

    if (v.replies) {
      v.replies.forEach((r) => {
        const reply = new ArticleComment();
        reply.parentComment = comment;
        reply.nickName = r.user_name;
        reply.content = r.content;
        reply.id = toGeekId(r.id);
      });
    }
  });
  console.log(id, 'comments saved');
}

async function login(phone: number, nvc: string) {
  const url = 'https://account.geekbang.org/account/ticket/login';
  const res = await post(url, {
    platform: 3,
    appid: 1,
    remember: 1,
    data: nvc,
    source: '',
    ucode: '',
    sc: {
      uid: '',
      report_source: 'H5',
      utm_identify: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
      share_code: '',
      original_id:
        '17738a35d968ba-061f2b6741aac6-5437971-304500-17738a35d97850',
      refer: '极客时间',
    },
    country: 86,
    cellphone: String(phone),
    password: 'youling',
  });
  console.log(res.body);
  await post('https://account.infoq.cn/account/ticket/token', {
    token: res.body.data.oss_token,
  });
}
