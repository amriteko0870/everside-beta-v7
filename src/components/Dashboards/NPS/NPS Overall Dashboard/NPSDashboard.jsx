import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import Filter from "../Misc/Filter";
import npsAPIdata from "../../../../recoil/atoms/npsAPIdata";
import nssAPIdata from "../../../../recoil/atoms/nssAPIdata";
import totalCardsApiData from "../../../../recoil/atoms/totalCardsApiData";
import npsOverTimeApiData from "../../../../recoil/atoms/npsOverTimeApiData";
import sentimentOverTimeApiData from "../../../../recoil/atoms/sentimentOverTimeApiData";
import npsVsSentimentApiData from "../../../../recoil/atoms/npsVsSentimentApiData";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import topCommentsApiData from "../../../../recoil/atoms/topCommentsApiData";
import alertCommentsApiData from "../../../../recoil/atoms/alertCommentsApiData";
import totalCommentsApiData from "../../../../recoil/atoms/totalCommentsApiData";
import NPSOverall from "./NPSOverall";
import NPSAnalysisPage from "../NPS Analysis/NPSAnalysisPage";
import NSSAnalysisPage from "../NSS/NSSAnalysisPage";
import CommentsPage from "../Comments/CommentsPage";
import activeInnerPage from "../../../../recoil/atoms/activeInnerPage";
import largeDateAtom from "../../../../recoil/atoms/largeDateAtom";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import regionList from "../../../../recoil/atoms/regionList";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import callClinics from "../../../../recoil/atoms/callClinics";
import regionSelectedValue from "../../../../recoil/atoms/regionSelectedValue";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import allDataRecieved from "../../../../recoil/atoms/allDataRecieved";
import providersApiData from "../../../../recoil/atoms/providersApiData";
import clientApidata from "../../../../recoil/atoms/clientApidata";
import positiveComments from "../../../../recoil/atoms/positiveComments";
import negativeComments from "../../../../recoil/atoms/negativeComments";
import extremeComments from "../../../../recoil/atoms/extremeComments";
import neutralComments from "../../../../recoil/atoms/neutralComments";
import EngagementModel from "../../EngagementModel/EngagementModel";
import Admin from "../../../Global/Admin";
import clientValue from "../../../../recoil/atoms/clientValue";
import runClientAPIatom from "../../../../recoil/atoms/runClientAPIatom";
import AvgNPSAtom from "../../../../recoil/atoms/AvgNPSAtom";
import ProviderScorePage from "../../ProviderScore/ProviderScorePage";
import newRegionGlobal2 from "../../../../recoil/atoms/newRegionGlobal2";

const NPSDashboard = () => {
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);

  const [avgNPS, setAvgNPS] = useRecoilState(AvgNPSAtom);

  const [positiveCommentAtom, setPositiveCommentAtom] =
    useRecoilState(positiveComments);
  const [negativeCommentAtom, setNegativeCommentAtom] =
    useRecoilState(negativeComments);
  const [extremeCommentAtom, setExtremeCommentAtom] =
    useRecoilState(extremeComments);
  const [neutralCommentAtom, setNeutralCommentAtom] =
    useRecoilState(neutralComments);

  const defaultStartYear = finalStartDate;

  const defaultStartMonth = 1;
  const defaultEndYear = finalEndDate;

  const defaultEndMonth = 5;

  const [providerApiAtom, setProviderApiAtom] =
    useRecoilState(providersApiData);
  const [npsApiData, setNpsApiData] = useRecoilState(npsAPIdata);
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);
  const [totalCardsAPIDatas, setTotalCardsAPIDatas] =
    useRecoilState(totalCardsApiData);
  const [npsOverTimeAPIData, setNpsOverTimeAPIData] =
    useRecoilState(npsOverTimeApiData);
  const [nssOverTimeAPIData, setNssOverTimeAPIData] = useRecoilState(
    sentimentOverTimeApiData
  );
  const [npsVsSentiAPIData, setNpsVsSentiAPIData] = useRecoilState(
    npsVsSentimentApiData
  );
  const [clinicsAPIData, setClinicsAPIData] = useRecoilState(clinicsApiData);
  const [topCommentsAPIData, setTopCommentsAPIData] =
    useRecoilState(topCommentsApiData);
  const [alertCommentsAPIData, setAlertCommentsAPIData] =
    useRecoilState(alertCommentsApiData);
  const [allCommentsAPIData, setAllCommentsAPIData] =
    useRecoilState(totalCommentsApiData);
  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);
  const [largeDate, setLargeDate] = useRecoilState(largeDateAtom);
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);
  const [regionValue, setRegionValue] = useRecoilState(regionSelectedValue);
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);
  const [callClinicValue, setCallClinicValue] = useRecoilState(callClinics);
  const [clinicsAPIdataValue, setClinicAPIDataValue] =
    useRecoilState(clinicsApiData);
  const linksArray = [];
  const defaultArray = [];
  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);
  const [selectedClientValue, setSelectedClientValue] =
    useRecoilState(clientValue);
  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobal2);
  const [allDataRecievedStatus, setAllDataRecievedStatus] =
    useRecoilState(allDataRecieved);
  const [clientApiAtom, setClientApiAtom] = useRecoilState(clientApidata);
  const [usernameLocal, setUsernameLocal] = useState();
  const [runClientAPI, setRunClientAPI] = useRecoilState(runClientAPIatom);

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  const allApiNames = [
    "positiveComments",
    "netPromoterScore",
    "neutralComments",
    "netSentimentScore",
    "negativeComments",
    "totalCards",
    "extremeComments",
    "totalComments",
    "alertComments",
    "npsOverTime",
    "nssOverTime",
    "npsVsSentiments",
    "providersData",
    "clinicData",
    "clientData",
    "npsAverageGraph",
    "filterRegion",
    "filterClinic",
    "filterClient",
  ];

  const formdata = new FormData();
  formdata.append("username", usernameLocal);

  useEffect(async () => {
    // Region
    if (callRegion === true && usernameLocal) {
      const regionData = await axios.post(
        baseAPI +
          "filterRegion?start_month=" +
          finalStartMonth +
          "&start_year=" +
          finalStartDate +
          "&end_month=" +
          finalEndMonth +
          "&end_year=" +
          finalEndDate +
          "&region=" +
          newRegionGlobal +
          "&clinic=" +
          selectedClinicValue +
          "&client=" +
          selectedClientValue,
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      // console.log('new region global data : ', newRegionGlobal, 'error')
      setRegionListValue(regionData?.data);

      if (regionData?.data) {
        setRunClientAPI(true);
        setTimeout(() => {
          setRunClientAPI(false);
        }, 500);
      }
    }
  }, [callRegion, usernameLocal]);

  useEffect(async () => {
    // API url creation
    for (let i = 0; i < 17; i++) {
      const requestURL =
        baseAPI +
        allApiNames[i] +
        "?" +
        "start_year=" +
        finalStartDate +
        "&" +
        "start_month=" +
        finalStartMonth +
        "&" +
        "end_year=" +
        finalEndDate +
        "&" +
        "end_month=" +
        finalEndMonth +
        "&region=" +
        newRegionGlobal +
        "&clinic=" +
        selectedClinicValue +
        "&client=" +
        selectedClientValue;

      const defaultUrl =
        baseAPI +
        allApiNames[i] +
        "?" +
        "start_year=" +
        finalStartDate +
        "&" +
        "start_month=" +
        finalStartMonth +
        "&" +
        "end_year=" +
        finalEndDate +
        "&" +
        "end_month=" +
        finalEndMonth +
        "&region=" + 
        newRegionGlobal +
        "&clinic=" +
        "" +
        "&client=" +
        "";

      linksArray.push(requestURL);
      defaultArray.push(defaultUrl);
    }

    setNpsApiData(null);
    setNssApiData(null);
    setTotalCardsAPIDatas(null);
    setNpsOverTimeAPIData(null);
    setNssOverTimeAPIData(null);
    setNpsVsSentiAPIData(null);
    setClinicsAPIData(null);
    setTopCommentsAPIData(null);
    setAlertCommentsAPIData(null);
    setAllCommentsAPIData(null);
    setProviderApiAtom(null);
    setClientApiAtom(null);
    setAvgNPS(null);

    // API Calls
    if (sendDataStatus === true && usernameLocal) {
      const postive_comments = await axios.post(
        linksArray[0],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setPositiveCommentAtom(postive_comments?.data), 50);

      const nps = await axios.post(
        linksArray[1],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNpsApiData(nps?.data), 50);

      const neutral_comments = await axios.post(
        linksArray[2],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNeutralCommentAtom(neutral_comments?.data), 50);

      const nss = await axios.post(
        linksArray[3],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNssApiData(nss?.data), 50);

      const negative_comments = await axios.post(
        linksArray[4],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNegativeCommentAtom(negative_comments?.data), 50);

      const totalCards = await axios.post(
        linksArray[5],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setTotalCardsAPIDatas(totalCards?.data), 50);

      const extreme_comments = await axios.post(
        linksArray[6],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setExtremeCommentAtom(extreme_comments?.data), 50);

      const allComments = await axios.post(
        linksArray[7],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setAllCommentsAPIData(allComments?.data);
      }, 50);

      const alerts = await axios.post(
        linksArray[8],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setAlertCommentsAPIData(alerts?.data), 50);

      const npsOverTime = await axios.post(
        linksArray[9],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setNpsOverTimeAPIData(npsOverTime?.data);
      }, 50);

      const nssOverTime = await axios.post(
        linksArray[10],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setNssOverTimeAPIData(nssOverTime?.data);
      }, 50);

      const npsVsSentiment = await axios.post(
        linksArray[11],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNpsVsSentiAPIData(npsVsSentiment?.data), 50);

      const providers = await axios.post(
        linksArray[12],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setProviderApiAtom(providers), 50);

      const clinics = await axios.post(
        linksArray[13],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setClinicsAPIData(clinics?.data), 50);

      const clients = await axios.post(
        linksArray[14],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setClientApiAtom(clients?.data);
        setAllDataRecievedStatus(true);
      });

      const avgNps = await axios.post(
        linksArray[15],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setAvgNPS(avgNps?.data);
        setAllDataRecievedStatus(true);
      });
    }

    // ELSE
    else if (sendDataStatus === -1 && usernameLocal) {
      const postive_comments = await axios.post(
        defaultArray[0],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setPositiveCommentAtom(postive_comments?.data), 50);

      const nps = await axios.post(
        defaultArray[1],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNpsApiData(nps?.data), 50);

      const neutral_comments = await axios.post(
        defaultArray[2],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNeutralCommentAtom(neutral_comments?.data), 50);

      const nss = await axios.post(
        defaultArray[3],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNssApiData(nss?.data), 50);

      const negative_comments = await axios.post(
        defaultArray[4],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNegativeCommentAtom(negative_comments?.data), 50);

      const totalCards = await axios.post(
        defaultArray[5],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setTotalCardsAPIDatas(totalCards?.data), 50);

      const extreme_comments = await axios.post(
        defaultArray[6],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setExtremeCommentAtom(extreme_comments?.data), 50);

      const allComments = await axios.post(
        defaultArray[7],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setAllCommentsAPIData(allComments?.data);
      }, 50);

      const alerts = await axios.post(
        defaultArray[8],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setAlertCommentsAPIData(alerts?.data), 50);

      const npsOverTime = await axios.post(
        defaultArray[9],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setNpsOverTimeAPIData(npsOverTime?.data);
      }, 50);

      const nssOverTime = await axios.post(
        defaultArray[10],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setNssOverTimeAPIData(nssOverTime?.data);
      }, 50);

      const npsVsSentiment = await axios.post(
        defaultArray[11],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setNpsVsSentiAPIData(npsVsSentiment?.data), 50);

      const providers = await axios.post(
        defaultArray[12],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setProviderApiAtom(providers), 50);

      const clinics = await axios.post(
        defaultArray[13],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => setClinicsAPIData(clinics?.data), 50);

      const clients = await axios.post(
        defaultArray[14],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setClientApiAtom(clients?.data);
        // setAllDataRecievedStatus(true);
      });

      const avgNps = await axios.post(
        defaultArray[15],
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      setTimeout(() => {
        setAvgNPS(avgNps?.data);
        setAllDataRecievedStatus(true);
      });
    }
  }, [goStatus, usernameLocal]);

  return (
    <div className="relative">
      <div className=" sticky top-12  z-10  bg-white">
        <Filter />
      </div>
      {activePageValue === "NPS_Overall" ? <NPSOverall /> : ""}
      {activePageValue === "NPS_Analysis" ? <NPSAnalysisPage /> : ""}
      {activePageValue === "NSS_Analysis" ? <NSSAnalysisPage /> : ""}
      {activePageValue === "Comments" ? <CommentsPage /> : ""}
      {activePageValue === "Engagement_Model" ? <EngagementModel /> : ""}
      {activePageValue === "Provider_Score" ? <ProviderScorePage /> : ""}
    </div>
  );
};

export default NPSDashboard;
