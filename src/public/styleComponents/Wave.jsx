import { useMediaQuery, useTheme } from "@mui/material";

const Wave = ({ title }) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <div className="wave-container">
        <svg
          width="75%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 390"
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-300 ease-in-out delay-150 wave"
        >
          <style>
            {`
          .path-0{
            animation:pathAnim-0 4s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes pathAnim-0{
            0%{
              d: path("M 0,400 L 0,75 C 46.651141384388794,71.12297496318115 93.30228276877759,67.2459499263623 147,76 C 200.6977172312224,84.7540500736377 261.4420103092784,106.13917525773196 326,111 C 390.5579896907216,115.86082474226804 458.92967599410895,104.19734904270987 524,91 C 589.070324005891,77.80265095729013 650.8392857142859,63.07142857142857 704,55 C 757.1607142857141,46.92857142857143 801.7131811487482,45.51693667157585 866,61 C 930.2868188512518,76.48306332842415 1014.3079896907216,108.86082474226804 1079,105 C 1143.6920103092784,101.13917525773196 1189.0548600883653,61.03976435935199 1246,50 C 1302.9451399116347,38.96023564064801 1371.4725699558173,56.980117820324004 1440,75 L 1440,400 L 0,400 Z");
            }
            25%{
              d: path("M 0,400 L 0,75 C 43.45489690721651,89.240058910162 86.90979381443302,103.48011782032401 152,110 C 217.09020618556698,116.51988217967599 303.8157216494845,115.31958762886597 368,100 C 432.1842783505155,84.68041237113403 473.82731958762895,55.241531664212076 533,50 C 592.172680412371,44.758468335787924 668.875,63.71428571428572 731,72 C 793.125,80.28571428571428 840.6726804123713,77.90132547864508 904,78 C 967.3273195876287,78.09867452135492 1046.4342783505156,80.68041237113401 1103,87 C 1159.5657216494844,93.31958762886599 1193.5902061855668,103.37702503681885 1246,102 C 1298.4097938144332,100.62297496318115 1369.2048969072166,87.81148748159058 1440,75 L 1440,400 L 0,400 Z");
            }
            50%{
              d: path("M 0,400 L 0,75 C 44.97956553755522,70.36156111929307 89.95913107511043,65.72312223858616 153,71 C 216.04086892488957,76.27687776141384 297.14304123711344,91.46907216494846 363,87 C 428.85695876288656,82.53092783505154 479.4687039764359,58.400589101620035 541,53 C 602.5312960235641,47.599410898379965 674.9821428571428,60.92857142857143 727,65 C 779.0178571428572,69.07142857142857 810.6027245949928,63.88512518409425 873,53 C 935.3972754050072,42.11487481590575 1028.6069587628865,25.530927835051543 1090,39 C 1151.3930412371135,52.46907216494846 1180.9694403534609,95.99116347569957 1234,107 C 1287.0305596465391,118.00883652430043 1363.5152798232696,96.50441826215021 1440,75 L 1440,400 L 0,400 Z");
            }
            75%{
              d: path("M 0,400 L 0,75 C 55.580081001472735,65.79142120765832 111.16016200294547,56.58284241531664 173,57 C 234.83983799705453,57.41715758468336 302.93943298969083,67.46005154639175 359,63 C 415.06056701030917,58.539948453608254 459.0821060382915,39.57695139911635 508,45 C 556.9178939617085,50.42304860088365 610.7321428571429,80.23214285714286 686,80 C 761.2678571428571,79.76785714285714 857.9893225331369,49.49447717231222 919,46 C 980.0106774668631,42.50552282768778 1005.3105670103096,65.78994845360825 1066,78 C 1126.6894329896904,90.21005154639175 1222.7684094256258,91.3457290132548 1291,89 C 1359.2315905743742,86.6542709867452 1399.6157952871872,80.8271354933726 1440,75 L 1440,400 L 0,400 Z");
            }
            100%{
              d: path("M 0,400 L 0,75 C 46.651141384388794,71.12297496318115 93.30228276877759,67.2459499263623 147,76 C 200.6977172312224,84.7540500736377 261.4420103092784,106.13917525773196 326,111 C 390.5579896907216,115.86082474226804 458.92967599410895,104.19734904270987 524,91 C 589.070324005891,77.80265095729013 650.8392857142859,63.07142857142857 704,55 C 757.1607142857141,46.92857142857143 801.7131811487482,45.51693667157585 866,61 C 930.2868188512518,76.48306332842415 1014.3079896907216,108.86082474226804 1079,105 C 1143.6920103092784,101.13917525773196 1189.0548600883653,61.03976435935199 1246,50 C 1302.9451399116347,38.96023564064801 1371.4725699558173,56.980117820324004 1440,75 L 1440,400 L 0,400 Z");
            }
          }`}
          </style>
          <path
            d="M 0,400 L 0,75 C 46.651141384388794,71.12297496318115 93.30228276877759,67.2459499263623 147,76 C 200.6977172312224,84.7540500736377 261.4420103092784,106.13917525773196 326,111 C 390.5579896907216,115.86082474226804 458.92967599410895,104.19734904270987 524,91 C 589.070324005891,77.80265095729013 650.8392857142859,63.07142857142857 704,55 C 757.1607142857141,46.92857142857143 801.7131811487482,45.51693667157585 866,61 C 930.2868188512518,76.48306332842415 1014.3079896907216,108.86082474226804 1079,105 C 1143.6920103092784,101.13917525773196 1189.0548600883653,61.03976435935199 1246,50 C 1302.9451399116347,38.96023564064801 1371.4725699558173,56.980117820324004 1440,75 L 1440,400 L 0,400 Z"
            stroke="none"
            strokeWidth="0"
            fill="#abb8c3"
            fillOpacity="0.4"
            className="transition-all duration-300 ease-in-out delay-150 path-0"
            transform="rotate(-180 720 200)"
          ></path>
          <style>
            {`
          .path-1{
            animation:pathAnim-1 4s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes pathAnim-1{
            0%{
              d: path("M 0,400 L 0,175 C 57.34701767304861,172.7332474226804 114.69403534609722,170.4664948453608 164,168 C 213.30596465390278,165.5335051546392 254.57087628865975,162.8672680412371 326,155 C 397.42912371134025,147.1327319587629 499.0224594992636,134.06443298969072 564,149 C 628.9775405007364,163.93556701030928 657.3392857142857,206.875 710,204 C 762.6607142857143,201.125 839.6203976435935,152.43556701030928 908,140 C 976.3796023564065,127.5644329896907 1036.1791237113403,151.38273195876286 1101,157 C 1165.8208762886597,162.61726804123714 1235.6631075110456,150.0335051546392 1293,150 C 1350.3368924889544,149.9664948453608 1395.1684462444773,162.4832474226804 1440,175 L 1440,400 L 0,400 Z");
            }
            25%{
              d: path("M 0,400 L 0,175 C 74.9278350515464,188.86064064801178 149.8556701030928,202.72128129602356 201,204 C 252.1443298969072,205.27871870397644 279.5051546391752,193.97551546391753 334,184 C 388.4948453608248,174.02448453608247 470.1237113402062,165.37665684830634 542,164 C 613.8762886597938,162.62334315169366 676,168.51785714285714 739,178 C 802,187.48214285714286 865.8762886597938,200.5519145802651 927,211 C 988.1237113402062,221.4480854197349 1046.4948453608247,229.2744845360825 1105,211 C 1163.5051546391753,192.7255154639175 1222.1443298969073,148.350147275405 1278,138 C 1333.8556701030927,127.649852724595 1386.9278350515465,151.3249263622975 1440,175 L 1440,400 L 0,400 Z");
            }
            50%{
              d: path("M 0,400 L 0,175 C 66.72072901325478,181.28368924889543 133.44145802650957,187.56737849779088 196,197 C 258.55854197349043,206.43262150220912 316.95489690721655,219.01417525773198 378,209 C 439.04510309278345,198.98582474226802 502.7389543446244,166.3759204712813 558,153 C 613.2610456553756,139.6240795287187 660.0892857142857,145.4821428571429 710,149 C 759.9107142857143,152.5178571428571 812.9039027982326,153.69550810014726 875,151 C 937.0960972017674,148.30449189985274 1008.2951030927834,141.73582474226802 1069,149 C 1129.7048969072166,156.26417525773198 1179.9156848306334,177.36119293078056 1240,184 C 1300.0843151693666,190.63880706921944 1370.0421575846833,182.8194035346097 1440,175 L 1440,400 L 0,400 Z");
            }
            75%{
              d: path("M 0,400 L 0,175 C 41.30283505154638,187.9788291605302 82.60567010309276,200.9576583210604 149,200 C 215.39432989690724,199.0423416789396 306.8801546391753,184.14819587628864 381,184 C 455.1198453608247,183.85180412371136 511.8737113402062,198.44955817378496 572,197 C 632.1262886597938,195.55044182621504 695.625,178.05357142857144 742,167 C 788.375,155.94642857142856 817.6262886597937,151.3361561119293 883,148 C 948.3737113402063,144.6638438880707 1049.8698453608247,142.60180412371133 1110,152 C 1170.1301546391753,161.39819587628867 1188.894329896907,182.25662739322533 1237,188 C 1285.105670103093,193.74337260677467 1362.5528350515465,184.37168630338732 1440,175 L 1440,400 L 0,400 Z");
            }
            100%{
              d: path("M 0,400 L 0,175 C 57.34701767304861,172.7332474226804 114.69403534609722,170.4664948453608 164,168 C 213.30596465390278,165.5335051546392 254.57087628865975,162.8672680412371 326,155 C 397.42912371134025,147.1327319587629 499.0224594992636,134.06443298969072 564,149 C 628.9775405007364,163.93556701030928 657.3392857142857,206.875 710,204 C 762.6607142857143,201.125 839.6203976435935,152.43556701030928 908,140 C 976.3796023564065,127.5644329896907 1036.1791237113403,151.38273195876286 1101,157 C 1165.8208762886597,162.61726804123714 1235.6631075110456,150.0335051546392 1293,150 C 1350.3368924889544,149.9664948453608 1395.1684462444773,162.4832474226804 1440,175 L 1440,400 L 0,400 Z");
            }
          }`}
          </style>
          <path
            d="M 0,400 L 0,175 C 57.34701767304861,172.7332474226804 114.69403534609722,170.4664948453608 164,168 C 213.30596465390278,165.5335051546392 254.57087628865975,162.8672680412371 326,155 C 397.42912371134025,147.1327319587629 499.0224594992636,134.06443298969072 564,149 C 628.9775405007364,163.93556701030928 657.3392857142857,206.875 710,204 C 762.6607142857143,201.125 839.6203976435935,152.43556701030928 908,140 C 976.3796023564065,127.5644329896907 1036.1791237113403,151.38273195876286 1101,157 C 1165.8208762886597,162.61726804123714 1235.6631075110456,150.0335051546392 1293,150 C 1350.3368924889544,149.9664948453608 1395.1684462444773,162.4832474226804 1440,175 L 1440,400 L 0,400 Z"
            stroke="none"
            strokeWidth="0"
            fill="#abb8c3"
            fillOpacity="0.53"
            className="transition-all duration-300 ease-in-out delay-150 path-1"
            transform="rotate(-180 720 200)"
          ></path>
          <style>
            {`
          .path-2{
            animation:pathAnim-2 4s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes pathAnim-2{
            0%{
              d: path("M 0,400 L 0,275 C 66.30265095729013,285.88273195876286 132.60530191458025,296.7654639175258 193,290 C 253.39469808541975,283.2345360824742 307.8814432989691,258.8208762886598 369,250 C 430.1185567010309,241.1791237113402 497.86892488954356,247.95103092783503 562,245 C 626.1310751104564,242.04896907216497 686.6428571428571,229.375 751,238 C 815.3571428571429,246.625 883.5596465390281,276.54896907216494 933,282 C 982.4403534609719,287.45103092783506 1013.1185567010309,268.4291237113402 1063,265 C 1112.881443298969,261.5708762886598 1181.9661266568482,273.7345360824742 1248,278 C 1314.0338733431518,282.2654639175258 1377.0169366715759,278.63273195876286 1440,275 L 1440,400 L 0,400 Z");
            }
            25%{
              d: path("M 0,400 L 0,275 C 49.13346833578794,276.7934462444772 98.26693667157588,278.58689248895433 155,283 C 211.73306332842412,287.41310751104567 276.0657216494845,294.4458762886598 350,294 C 423.9342783505155,293.5541237113402 507.47017673048595,285.6296023564065 565,273 C 622.529823269514,260.3703976435935 654.0535714285714,243.0357142857143 702,248 C 749.9464285714286,252.9642857142857 814.3155375552284,280.2275405007363 889,297 C 963.6844624447716,313.7724594992637 1048.6842783505153,320.0541237113402 1107,310 C 1165.3157216494847,299.9458762886598 1196.94734904271,273.5559646539028 1248,265 C 1299.05265095729,256.4440353460972 1369.526325478645,265.72201767304864 1440,275 L 1440,400 L 0,400 Z");
            }
            50%{
              d: path("M 0,400 L 0,275 C 49.45931516936672,296.33357879234165 98.91863033873344,317.66715758468337 170,308 C 241.08136966126656,298.33284241531663 333.78479381443293,257.66494845360825 393,258 C 452.21520618556707,258.33505154639175 477.9421944035347,299.67304860088365 528,306 C 578.0578055964653,312.32695139911635 652.4464285714286,283.64285714285717 709,279 C 765.5535714285714,274.35714285714283 804.2720913107511,293.75552282768774 873,301 C 941.7279086892489,308.24447717231226 1040.4652061855672,303.33505154639175 1105,292 C 1169.5347938144328,280.66494845360825 1199.8670839469808,262.90427098674525 1250,259 C 1300.1329160530192,255.09572901325478 1370.0664580265097,265.0478645066274 1440,275 L 1440,400 L 0,400 Z");
            }
            75%{
              d: path("M 0,400 L 0,275 C 71.65187776141384,295.48435198821795 143.3037555228277,315.9687039764359 196,306 C 248.6962444771723,296.0312960235641 282.43685567010306,255.60953608247425 340,250 C 397.56314432989694,244.39046391752575 478.94882179675994,273.59315169366715 545,280 C 611.05117820324,286.40684830633285 661.7678571428571,270.01785714285717 717,257 C 772.2321428571429,243.98214285714283 831.9797496318115,234.33541973490424 891,247 C 950.0202503681885,259.66458026509576 1008.3131443298969,294.6404639175258 1067,310 C 1125.6868556701031,325.3595360824742 1184.767673048601,321.10272459499265 1247,312 C 1309.232326951399,302.89727540500735 1374.6161634756995,288.9486377025037 1440,275 L 1440,400 L 0,400 Z");
            }
            100%{
              d: path("M 0,400 L 0,275 C 66.30265095729013,285.88273195876286 132.60530191458025,296.7654639175258 193,290 C 253.39469808541975,283.2345360824742 307.8814432989691,258.8208762886598 369,250 C 430.1185567010309,241.1791237113402 497.86892488954356,247.95103092783503 562,245 C 626.1310751104564,242.04896907216497 686.6428571428571,229.375 751,238 C 815.3571428571429,246.625 883.5596465390281,276.54896907216494 933,282 C 982.4403534609719,287.45103092783506 1013.1185567010309,268.4291237113402 1063,265 C 1112.881443298969,261.5708762886598 1181.9661266568482,273.7345360824742 1248,278 C 1314.0338733431518,282.2654639175258 1377.0169366715759,278.63273195876286 1440,275 L 1440,400 L 0,400 Z");
            }
          }
          `}
          </style>
          <path
            d="M 0,400 L 0,275 C 66.30265095729013,285.88273195876286 132.60530191458025,296.7654639175258 193,290 C 253.39469808541975,283.2345360824742 307.8814432989691,258.8208762886598 369,250 C 430.1185567010309,241.1791237113402 497.86892488954356,247.95103092783503 562,245 C 626.1310751104564,242.04896907216497 686.6428571428571,229.375 751,238 C 815.3571428571429,246.625 883.5596465390281,276.54896907216494 933,282 C 982.4403534609719,287.45103092783506 1013.1185567010309,268.4291237113402 1063,265 C 1112.881443298969,261.5708762886598 1181.9661266568482,273.7345360824742 1248,278 C 1314.0338733431518,282.2654639175258 1377.0169366715759,278.63273195876286 1440,275 L 1440,400 L 0,400 Z"
            stroke="none"
            strokeWidth="0"
            fill="#abb8c3"
            fillOpacity="1"
            className="transition-all duration-300 ease-in-out delay-150 path-2"
            transform="rotate(-180 720 200)"
          ></path>
        </svg>
        <h1
          style={{
            fontSize: md && "large",
          }}
          className="profile-title"
        >
          {title}
        </h1>
      </div>
    </>
  );
};
export default Wave;