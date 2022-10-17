import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ClientIcon from "../../../../assets/img/NPS Dashboard/ClientIcon.svg";
import clientData from "../../../../mock_API/NPS/NPS Main Dashboard/Clients.json";
import clientApidata from "../../../../recoil/atoms/clientApidata";
import PuffLoader from "react-spinners/PuffLoader";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import chevron from "../../../../assets/img/NPS Dashboard/chevron.svg";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import { useDetectClickOutside } from "react-detect-click-outside";

// import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const Clients2 = () => {
  const [apiData, setApiData] = useState();
  const [apiData2, setApiData2] = useState();
  const [clienApiDatavalue, setClientApiDataValue] =
    useRecoilState(clientApidata);

  const [selectedParentClient, setSelectedParentClient] = useState([]);
  const [parentFilterStatus, setParentFilterStatus] = useState(false);
  const [inputData, setInputData] = useState("");

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    setApiData(clienApiDatavalue);
    setApiData2(clienApiDatavalue);
    console.log("client datttttttttttttttttttttttttta");
    console.log(clienApiDatavalue);
  }, [clienApiDatavalue]);

  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  useEffect(() => {
    let arr = [];

    apiData?.data?.map((data) => {
      if (selectedParentClient?.includes?.(data?.parent_client_name)) {
        arr = [...arr, ...[data]];
      }
    });

    setApiData2({
      data: arr,
      parent_client_names: apiData?.parent_client_names,
    });

    if (selectedParentClient.length === 0) {
      setApiData2(clienApiDatavalue);
    }
  }, [selectedParentClient]);

  function handleSelectAll() {
    let arr = apiData?.parent_client_names;
    setSelectedParentClient(arr);
  }

  const closeToggle = () => {
    setParentFilterStatus(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  return (
    <div className="px-5 pb-5 pt-5 border rounded-lg bg-white transition-all  w-[100%] h-[300px]">
      {!apiData2?.data && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData2?.data && (
        <div className="">
          {apiData2?.data?.length > 0 ? (
            <div className="h-[260px]">
              <div className="relative flex justify-between items-start  mb-1">
                <h1 className="  font-bold opacity-80 ">Clients</h1>

                <div ref={ref}>
                  <div
                    className="cursor-pointer text-sm text-gray-500 flex justify-between   border px-2 rounded-md hover:text-gray-800"
                    onClick={() => setParentFilterStatus(!parentFilterStatus)}
                  >
                    <div>Select Parent</div>
                    <img
                      src={chevron}
                      alt=" parent client filter"
                      className={` ${
                        parentFilterStatus
                          ? "rotate-0 ease-in"
                          : "rotate-180 ease-in"
                      } transition-all inline w-[6px] ml-1 `}
                    />
                  </div>
                  {/* Parent filter */}
                  <div
                    className={` ${
                      parentFilterStatus ? "block" : "hidden"
                    } bg-white  top-[100%] w-[200px] h-[220px] scrollbar-hide overflow-x-hidden absolute overflow-y-scroll right-0 shadow-lg rounded-lg z-[90]`}
                  >
                    <div className=" bg-white h-[30px] sticky top-0 z-[45]">
                      <div className="relative">
                        <input
                          type="text"
                          className="outline-none border-0 pl-8 w-full text-xs border-b pb-2"
                          placeholder="Search..."
                          onChange={handleInput}
                          value={inputData}
                        />
                        <div className="absolute top-1 left-1 w-5">
                          <img src={seachIcon} alt="" />
                        </div>
                      </div>
                    </div>

                    <div className="relative border ">
                      {apiData2?.parent_client_names
                        ?.filter((filtered_value) => {
                          if (inputData === "") {
                            return filtered_value;
                          } else if (
                            filtered_value
                              ?.toLowerCase()
                              ?.includes(inputData?.toLowerCase())
                          ) {
                            return filtered_value;
                          }
                        })
                        ?.map((data, index) => (
                          <div
                            key={index + 1}
                            className=" text-left m-2 cursor-pointer flex w-full "
                          >
                            <input
                              className=" cursor-pointer"
                              type="checkbox"
                              name={data}
                              value={data}
                              checked={
                                selectedParentClient?.includes(data)
                                  ? true
                                  : false
                              }
                              onChange={() => {
                                if (selectedParentClient?.includes(data)) {
                                  console.log(data + " already exits");
                                  setSelectedParentClient(
                                    (selectedParentClient) =>
                                      arrayRemove(selectedParentClient, data)
                                  );
                                } else {
                                  setSelectedParentClient(
                                    (selectedParentClient) => [
                                      ...selectedParentClient,
                                      data,
                                    ]
                                  );
                                }
                              }}
                            />

                            <label
                              htmlFor={data}
                              className="text-xs pl-2 cursor-pointer text-gray-600"
                              onClick={() => {
                                if (selectedParentClient?.includes(data)) {
                                  console.log(data + " already exits");
                                  setSelectedParentClient(
                                    (selectedParentClient) =>
                                      arrayRemove(selectedParentClient, data)
                                  );
                                } else {
                                  setSelectedParentClient(
                                    (selectedParentClient) => [
                                      ...selectedParentClient,
                                      data,
                                    ]
                                  );
                                }
                              }}
                            >
                              {data}
                            </label>
                          </div>
                        ))}
                      <div className=" h-[50px]"></div>
                    </div>

                    <div className="sticky z-[999]  bg-white bottom-0 left-0 right-0">
                      <div className="w-full flex gap-5 p-2 items-center">
                        <div
                          className="underline text-gray-500 hover:text-gray-600 cursor-pointer text-xs"
                          onClick={handleSelectAll}
                        >
                          Select all
                        </div>
                        <div
                          className="underline text-gray-500 hover:text-gray-600 cursor-pointer text-xs"
                          onClick={() => setSelectedParentClient([])}
                        >
                          Clear
                        </div>
                      </div>
                    </div>

                    {/* {apiData2?.parent_client_names} */}
                  </div>
                </div>
              </div>

              {/* clients body */}
              <div className="h-[250px] overflow-y-scroll">
                <div className="sticky bg-white top-0 z-[5] ">
                  <div className="grid grid-cols-[50px_minmax(150px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(60px,0.3fr)_minmax(30px,0.3fr)] gap-2 text-xs text-gray-400 border-b py-2">
                    <div className="flex  items-center">Type</div>
                    <div className="flex  items-center">Name</div>
                    <div className="flex  items-center">Positive Topic</div>
                    <div className="flex  items-center">Negative Topic</div>
                    <div className="text-center flex justify-center items-center ">
                      Survey Count
                    </div>
                    <div className="text-center flex justify-center items-center ">
                      NPS
                    </div>
                  </div>
                </div>

                <div className="">
                  {apiData2?.data?.map((data, index) => {
                    return (
                      <div key={index} className="">
                        <div className="grid grid-cols-[50px_minmax(150px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(60px,0.3fr)_minmax(30px,0.3fr)] gap-2    py-2 ">
                          <div className=" text-sm   flex justify-center items-center text-[#0094e0]  bg-[#e6f5fc] rounded-full uppercase">
                            <StoreRoundedIcon className="text-[#0094e0] w-[40px]" />
                          </div>
                          <div className="">
                            <div className="text-sm">{data?.client_name}</div>
                            <div className="text-gray-500 text-xs">
                              {data?.parent_client_name}
                            </div>
                          </div>
                          <div className=" text-gray-500 text-xs flex  items-center">
                            {apiData?.topic[index].POSITIVE_TOPIC}
                          </div>
                          <div className="text-gray-500 text-xs flex  items-center">
                            {apiData?.topic[index].NEGATIVE_TOPIC}
                          </div>
                          <div className="text-sm text-gray-500 text-center">
                            {data?.count}
                          </div>
                          <div className="text-sm text-gray-500 text-center">
                            {" "}
                            {data?.average_nps}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[300px] w-full flex justify-center items-center text-gray-400">
              No Clients
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Clients2;
