import React, { useState, useMemo } from "react";
import { products } from "@/constant/data"; // Ensure this path is correct
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Bubble from "@/pages/chart/appex-chart/Bubble"
import MixedChart from "@/pages/chart/appex-chart/Mixed";
import { Link } from "react-router-dom";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter"; // Ensure this path is correct

const COLUMNS = [
  {
    Header: "Rank",
    accessor: "rank",
    Cell: ({ row }) => <span>#{row.index + 1}</span>, // Row index for ranking
  },
  // {
  //   Header: "Name",
  //   accessor: "name", // Name of proposer or beneficiary
  //   Cell: ({ cell }) => <span>{truncateName(cell.value)}</span>
  // },
  {
    Header: "Address",
    accessor: "entity", // Address of proposer or beneficiary
    Cell: ({ cell }) => <Link target="_blank" to={`https://polkadot.subsquare.io/user/${cell.value}`} className="text-blue-500"> <span>{truncateAddress(cell.value)}</span></Link>,
  },
  {
    Header: "Approved Proposals",
    accessor: "proposals",
    Cell: ({ cell }) => (
      <span className="flex justify-center font-bold">{cell.value}</span>
    ),
  },
  
  {
    Header: "",
    accessor: "open",
    Cell: ({ row }) => (
      <div className="flex space-x-3 rtl:space-x-reverse">
        <button
          className="action-btn rounded-full px-8 py-3 hover:bg-kog-900 font-bold text-md shadow-[0px_0px_8px_4px_rgba(0,0,0,0.4)] hover:shadow-[inset_0px_0px_5px_2px_rgba(0,0,0,0.4)] animate-glow"
          type="button"
          onClick={() => row.original.handleView()}
        >
          View
        </button>
      </div>
    ),
  },
];

// Function to truncate addresses
const truncateAddress = (address) => {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-6);
};

const truncateName = (name) => {
  if (!name) return "";
  return name.length > 15 ? name.slice(0, 19) + "..." : name;
};

const ExampleTwo = () => {
  // State for the popups
  const [popupContent, setPopupContent] = useState(null);
  const [popupType, setPopupType] = useState(""); // "beneficiary" or "proposer"

  // Handle view proposals for beneficiary
  const handleViewBeneficiaryProposals = (entity) => {
    // Filter products for the selected beneficiary
    const entityProducts = products.filter(
      (product) => product.benAdd === entity
    );

    // Compute the required data
    const totalReqDot = entityProducts.reduce((sum, product) => {
      const { reqDot } = product;
      // Exclude values that include USD inside the value
      if (reqDot.includes("USD")) return sum;
      // Remove commas from reqDot and convert to number
      const reqDotValue = parseFloat(reqDot.replace(/,/g, ""));
      return sum + (isNaN(reqDotValue) ? 0 : reqDotValue);
    }, 0);

    const totalStables = entityProducts.reduce((sum, product) => {
      const { reqDot } = product;
      if (reqDot.includes("USD")) {
        // Extract numeric value
        const value = parseFloat(
          reqDot.replace(/,/g, "").replace(/USDT|USDC|USD/g, "").trim()
        );
        return sum + (isNaN(value) ? 0 : value);
      }
      return sum;
    }, 0);

    const totalProducts = entityProducts.length;

    const refNumsAndTracks = entityProducts.map((product) => ({
      refNum: product.refNum,
      track: product.track,
    }));

    const totalDelivered = entityProducts.filter(
      (product) => product.status === "Delivered"
    ).length;

    const totalInProgress = entityProducts.filter(
      (product) => product.status === "InProgress"
    ).length;

    // Set the popup content with the computed data
    setPopupContent({
      entity,
      totalReqDot,
      totalStables,
      totalProducts,
      refNumsAndTracks,
      totalDelivered,
      totalInProgress,
    });
    setPopupType("beneficiary");
  };

  // Handle view proposals for proposer
  const handleViewProposerProposals = (entity) => {
    // Filter products for the selected proposer
    const entityProducts = products.filter(
      (product) => product.proposerAdd === entity
    );

    // Compute the required data
    const totalReqDot = entityProducts.reduce((sum, product) => {
      const { reqDot } = product;
      // Exclude values that include USD inside the value
      if (reqDot.includes("USD")) return sum;
      const reqDotValue = parseFloat(product.reqDot.replace(/,/g, ""));
      return sum + (isNaN(reqDotValue) ? 0 : reqDotValue);
    }, 0);

    const totalStables = entityProducts.reduce((sum, product) => {
      const { reqDot } = product;
      if (reqDot.includes("USD")) {
        // Extract numeric value
        const value = parseFloat(
          reqDot.replace(/,/g, "").replace(/USDT|USDC|USD/g, "").trim()
        );
        return sum + (isNaN(value) ? 0 : value);
      }
      return sum;
    }, 0);

    const totalProducts = entityProducts.length;

    const refNumsAndTracks = entityProducts.map((product) => ({
      refNum: product.refNum,
      track: product.track,
    }));

    const totalDelivered = entityProducts.filter(
      (product) => product.status === "Delivered"
    ).length;

    const totalInProgress = entityProducts.filter(
      (product) => product.status === "InProgress"
    ).length;

    // Get the proposer name (assuming it's the same for the same proposerAdd)
    const proposerName = entityProducts[0]?.proposer || "-";

    // Set the popup content with the computed data
    setPopupContent({
      entity,
      name: proposerName,
      totalReqDot,
      totalStables,
      totalProducts,
      refNumsAndTracks,
      totalDelivered,
      totalInProgress,
    });
    setPopupType("proposer");
  };

  const closePopup = () => {
    setPopupContent(null);
    setPopupType("");
  };

  const columns = useMemo(() => COLUMNS, []);

  // Aggregate data to calculate proposals count per beneficiary
  const beneficiaryData = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      const { benAdd } = product;
      if (!benAdd || benAdd === "-") return acc;
      if (!acc[benAdd]) acc[benAdd] = { proposals: 0 };
      acc[benAdd].proposals++;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([entity, { proposals }]) => ({
        entity,
        name: "-", // No name available for beneficiaries
        proposals,
        handleView: () => handleViewBeneficiaryProposals(entity),
      }))
      .sort((a, b) => b.proposals - a.proposals);
  }, []);

  // Aggregate data to calculate proposals count per proposer
  const proposerData = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      const { proposerAdd, proposer } = product;
      if (!proposerAdd || proposerAdd === "-") return acc;
      if (!acc[proposerAdd]) {
        acc[proposerAdd] = { proposals: 0, name: proposer || "-" };
      }
      acc[proposerAdd].proposals++;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([entity, { proposals, name }]) => ({
        entity,
        name,
        proposals,
        handleView: () => handleViewProposerProposals(entity),
      }))
      .sort((a, b) => b.proposals - a.proposals);
  }, []);

  // Table instances
  const beneficiaryTableInstance = useTable(
    {
      columns,
      data: beneficiaryData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const proposerTableInstance = useTable(
    {
      columns,
      data: proposerData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  // Destructure table instance variables for both tables
  const {
    getTableProps: getTablePropsBeneficiary,
    getTableBodyProps: getTableBodyPropsBeneficiary,
    headerGroups: headerGroupsBeneficiary,
    page: pageBeneficiary,
    nextPage: nextPageBeneficiary,
    previousPage: previousPageBeneficiary,
    canNextPage: canNextPageBeneficiary,
    canPreviousPage: canPreviousPageBeneficiary,
    pageOptions: pageOptionsBeneficiary,
    state: stateBeneficiary,
    gotoPage: gotoPageBeneficiary,
    pageCount: pageCountBeneficiary,
    setPageSize: setPageSizeBeneficiary,
    setGlobalFilter: setGlobalFilterBeneficiary,
    prepareRow: prepareRowBeneficiary,
  } = beneficiaryTableInstance;

  const {
    getTableProps: getTablePropsProposer,
    getTableBodyProps: getTableBodyPropsProposer,
    headerGroups: headerGroupsProposer,
    page: pageProposer,
    nextPage: nextPageProposer,
    previousPage: previousPageProposer,
    canNextPage: canNextPageProposer,
    canPreviousPage: canPreviousPageProposer,
    pageOptions: pageOptionsProposer,
    state: stateProposer,
    gotoPage: gotoPageProposer,
    pageCount: pageCountProposer,
    setPageSize: setPageSizeProposer,
    setGlobalFilter: setGlobalFilterProposer,
    prepareRow: prepareRowProposer,
  } = proposerTableInstance;

  const {
    globalFilter: globalFilterBeneficiary,
    pageIndex: pageIndexBeneficiary,
    pageSize: pageSizeBeneficiary,
  } = stateBeneficiary;

  const {
    globalFilter: globalFilterProposer,
    pageIndex: pageIndexProposer,
    pageSize: pageSizeProposer,
  } = stateProposer;

  // Generate pagination items for beneficiaries
  const paginationItemsBeneficiary = useMemo(() => {
    const pageNumbers = [];
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (pageCountBeneficiary > totalBlocks) {
      let startPage = Math.max(1, pageIndexBeneficiary - 1);
      let endPage = Math.min(
        pageCountBeneficiary - 1,
        pageIndexBeneficiary + 3
      );

      pageNumbers.push(0);

      if (startPage > 1) {
        pageNumbers.push("prevEllipsis");
      }

      for (let i = startPage; i < endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < pageCountBeneficiary - 1) {
        pageNumbers.push("nextEllipsis");
      }

      pageNumbers.push(pageCountBeneficiary - 1);
    } else {
      for (let i = 0; i < pageCountBeneficiary; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  }, [pageCountBeneficiary, pageIndexBeneficiary]);

  // Generate pagination items for proposers
  const paginationItemsProposer = useMemo(() => {
    const pageNumbers = [];
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (pageCountProposer > totalBlocks) {
      let startPage = Math.max(1, pageIndexProposer - 1);
      let endPage = Math.min(pageCountProposer - 1, pageIndexProposer + 3);

      pageNumbers.push(0);

      if (startPage > 1) {
        pageNumbers.push("prevEllipsis");
      }

      for (let i = startPage; i < endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < pageCountProposer - 1) {
        pageNumbers.push("nextEllipsis");
      }

      pageNumbers.push(pageCountProposer - 1);
    } else {
      for (let i = 0; i < pageCountProposer; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  }, [pageCountProposer, pageIndexProposer]);

  return (
    <>
      <div className="">
        <div className="flex flex-col md:flex-row">
          {/* Proposers Table */}
          <div className="md:w-1/2 sm:mt-0 mt-4">
            {/* <Card className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]"> */}
            <div className="border rounded-md border-opacity-50 border-kog-400 bg-kog-50 pb-4 shadow-[0px_1px_10px_2px_rgba(0,0,0,0.4)] backdrop-filter backdrop-blur-sm bg-opacity-10 mx-2">
              <div className="border-kog-400 py-3">
                <div className="md:flex justify-between items-center mb-5 px-5 text-center  sm:text-left">
                  <h4 className="card-title mb-4 sm:mb-0">All Proposers</h4>
                  <div>
                    <GlobalFilter
                      filter={globalFilterProposer}
                      setFilter={setGlobalFilterProposer}
                    />
                  </div>
                </div>
                <div className="overflow-x-auto ">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      <table
                        className="min-w-full divide-y table-fixed divide-slate-700 "
                        {...getTablePropsProposer()}
                      >
                        <thead className="bg-slate-700 text-center">
                          {headerGroupsProposer.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                  scope="col"
                                  className="table-th py-3 !text-center"
                                >
                                  {column.render("Header")}
                                  <span>
                                    {column.isSorted
                                      ? column.isSortedDesc
                                        ? " 🔽"
                                        : " 🔼"
                                      : ""}
                                  </span>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody
                          className="divide-y bg-kog-50 divide-slate-700"
                          {...getTableBodyPropsProposer()}
                        >
                          {pageProposer.map((row) => {
                            prepareRowProposer(row);
                            return (
                              <tr {...row.getRowProps()}
                                className="shadow-[inset_0px_0px_8px_3px_rgba(0,0,0,0.4)] text-center"
                              >

                                {row.cells.map((cell) => (
                                  <td
                                    {...cell.getCellProps()}
                                    className="table-td py-4 "
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Pagination */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 px-5">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <select
                      className="form-control py-2 w-max rounded-full text-white bg-kog-200"
                      value={pageSizeProposer}
                      onChange={(e) =>
                        setPageSizeProposer(Number(e.target.value))
                      }
                    >
                      {[5, 10, 25, 50].map((size) => (
                        <option key={size} value={size}>
                          Show {size}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm font-medium text-white">
                      Page {pageIndexProposer + 1} of {pageOptionsProposer.length}
                    </span>
                  </div>
                  <div className="flex justify-center mt-4 md:mt-0">
                    <ul className="flex items-center space-x-1 rtl:space-x-reverse">
                      <li>
                        <button
                          onClick={() => previousPageProposer()}
                          disabled={!canPreviousPageProposer}
                          className={`px-2 py-1 rounded-full ${!canPreviousPageProposer
                              ? "opacity-50 cursor-not-allowed"
                              : " text-white"
                            }`}
                        >
                          <Icon icon="heroicons:arrow-left" />
                        </button>
                      </li>
                      {paginationItemsProposer.map((item, idx) => {
                        if (item === "prevEllipsis" || item === "nextEllipsis") {
                          return (
                            <li key={idx}>
                              <span className="px-2 py-1">...</span>
                            </li>
                          );
                        } else {
                          return (
                            <li key={idx}>
                              <button
                                onClick={() => gotoPageProposer(item)}
                                className={`w-8 h-8 rounded-full border border-kog-400 border-opacity-30 ${item === pageIndexProposer
                                    ? "bg-kog-900 text-white shadow-[inset_0px_0px_4px_2px_rgba(0,0,0,0.4)] border-kog-400"
                                    : "bg-kog-200 text-white border-kog-400"
                                  }`}
                              >
                                {item + 1}
                              </button>
                            </li>
                          );
                        }
                      })}
                      <li>
                        <button
                          onClick={() => nextPageProposer()}
                          disabled={!canNextPageProposer}
                          className={`px-2 py-1 rounded-full ${!canNextPageProposer
                              ? "opacity-50 cursor-not-allowed"
                              : " text-white"
                            }`}
                        >
                          <Icon icon="heroicons:arrow-right" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-span-7 m-2">


                </div>
              </div>
            </div>
            {/* </Card> */}
          </div>

          {/* Beneficiaries Table */}
          <div className="md:w-1/2 sm:mt-0 mt-4">
            <div className="border rounded-md border-opacity-50 border-kog-400 bg-kog-50 pb-6 shadow-[0px_1px_10px_2px_rgba(0,0,0,0.4)] backdrop-filter backdrop-blur-sm bg-opacity-10 mx-2">
              <div className="border-kog-400 py-3">
                <div className="md:flex justify-between items-center mb-5 px-5 text-center sm:text-left">
                  <h4 className="card-title sm:mb-0 mb-4">All Beneficiaries</h4>
                  <div>
                    <GlobalFilter
                      filter={globalFilterBeneficiary}
                      setFilter={setGlobalFilterBeneficiary}
                    />
                  </div>
                </div>
                <div className="overflow-x-auto ">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      <table
                        className="min-w-full divide-y table-fixed divide-slate-700"
                        {...getTablePropsBeneficiary()}
                      >
                        <thead className="bg-slate-700">
                          {headerGroupsBeneficiary.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                  scope="col"
                                  className="table-th py-3 !text-center"
                                >
                                  {column.render("Header")}
                                  <span>
                                    {column.isSorted
                                      ? column.isSortedDesc
                                        ? " 🔽"
                                        : " 🔼"
                                      : ""}
                                  </span>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody
                          className="divide-y bg-kog-50 divide-slate-700"
                          {...getTableBodyPropsBeneficiary()}
                        >
                          {pageBeneficiary.map((row) => {
                            prepareRowBeneficiary(row);
                            return (
                              <tr
                                {...row.getRowProps()}
                                className="shadow-[inset_0px_0px_8px_3px_rgba(0,0,0,0.4)] text-center"
                              >
                                {row.cells.map((cell) => (
                                  <td
                                    {...cell.getCellProps()}
                                    className="table-td py-4"
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Pagination */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 px-5">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <select
                      className="form-control py-2 w-max px-3 rounded-full text-white bg-kog-200"
                      value={pageSizeBeneficiary}
                      onChange={(e) =>
                        setPageSizeBeneficiary(Number(e.target.value))
                      }
                    >
                      {[5, 10, 25, 50].map((size) => (
                        <option key={size} value={size}>
                          Show {size}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm font-mediumtext-slate-300">
                      Page {pageIndexBeneficiary + 1} of{" "}
                      {pageOptionsBeneficiary.length}
                    </span>
                  </div>
                  <div className="flex justify-center mt-4 md:mt-0">
                    <ul className="flex items-center space-x-1 rtl:space-x-reverse">
                      <li>
                        <button
                          onClick={() => previousPageBeneficiary()}
                          disabled={!canPreviousPageBeneficiary}
                          className={`px-2 py-1 rounded-full ${!canPreviousPageBeneficiary
                              ? "opacity-50 cursor-not-allowed"
                              : "text-white"
                            }`}
                        >
                          <Icon icon="heroicons:arrow-left" />
                        </button>
                      </li>
                      {paginationItemsBeneficiary.map((item, idx) => {
                        if (item === "prevEllipsis" || item === "nextEllipsis") {
                          return (
                            <li key={idx}>
                              <span className="px-2 py-1">...</span>
                            </li>
                          );
                        } else {
                          return (
                            <li key={idx}>
                              <button
                                onClick={() => gotoPageBeneficiary(item)}
                                className={`w-8 h-8 rounded-full border border-kog-400 border-opacity-30 ${item === pageIndexBeneficiary
                                    ? "bg-kog-900 text-white shadow-[inset_0px_0px_4px_2px_rgba(0,0,0,0.4)] border-kog-400"
                                    : "bg-kog-200 text-white border-kog-400"
                                  }`}
                              >
                                {item + 1}
                              </button>
                            </li>
                          );
                        }
                      })}
                      <li>
                        <button
                          onClick={() => nextPageBeneficiary()}
                          disabled={!canNextPageBeneficiary}
                          className={`px-2 py-1 rounded-full ${!canNextPageBeneficiary
                              ? "opacity-50 cursor-not-allowed"
                              : " text-white"
                            }`}
                        >
                          <Icon icon="heroicons:arrow-right" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>

      {/* Popup */}
      {popupContent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closePopup}
        >
          <div
            className="bg-kog-300 p-6 backdrop-filter shadow-[inset_0px_0px_15px_2px_rgba(0,0,0,1)] backdrop-blur-md border border-kog-400 border-opacity-50 bg-opacity-40 rounded text-center max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <h2 className="text-lg font-bold mb-4">
              <span className="text-2xl font-bold py-1 w-full inline-block">
                {popupContent.name}
              </span>
            </h2> */}
            <div className="grid grid-cols-2">
              <p className="bg-kog-50 m-1 col-span-2 rounded-full py-2 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] border border-kog-400 border-opacity-50">
                <span className="text-white"> Total proposals </span><br /> <span className="font-bold text-lg"> {popupContent.totalProducts}</span>
              </p>

              <p className="bg-kog-50 m-1 rounded-full py-2 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] border border-kog-400 border-opacity-50">
                <span className="text-white">DOT Received </span> <br /> <span className="font-bold text-lg"> {Number(popupContent.totalReqDot).toLocaleString()}</span>
              </p>
              <p className="bg-kog-50 m-1 rounded-full py-2 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] border border-kog-400 border-opacity-50">
                <span className="text-white">Stables Received</span><br />  <span className="font-bold text-lg">  {Number(popupContent.totalStables).toLocaleString()}</span>
              </p>
              <p className="bg-kog-50 m-1 rounded-full py-2 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] border border-kog-400 border-opacity-50">
                <span className="text-white">Delivered Proposals </span><br />  <span className="font-bold text-lg"> {popupContent.totalDelivered}</span>
              </p>

              <p className="bg-kog-50 m-1 rounded-full py-2 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] border border-kog-400 border-opacity-50">
                <span className="text-white">In Progress Proposals </span><br /> <span className="font-bold text-lg"> {popupContent.totalInProgress}</span>
              </p>



            </div>

            <div className="border mt-8 mb-6 border-kog-500 border-opacity-60 shadow-xl"></div>
            <h5 className="font-bold mt-2 mb-5 text-white">{popupType === "beneficiary" ? "Beneficiary on" : "Proposer on"}</h5>
            <ul className="flex flex-wrap items-center justify-center mt-2">
              {popupContent.refNumsAndTracks.map((item, index) => (
                <Link to={`/${item.track}/${item.refNum}`} key={index}>
                  <li
                    className="m-1 px-4 py-1 bg-gradient-to-t from-kog-300 to-kog-400 border border-kog-400 rounded-full shadow-[inset_0px_0px_5px_2px_rgba(0,0,0,0.4)] hover:to-kog-900  "
                  >
                    <span className="font-bold">#{item.refNum}</span>
                  </li>
                </Link>
              ))}
            </ul>
            <button
              onClick={closePopup}
              className="mt-8 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-700 border border-kog-400 border-opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExampleTwo;
