import { Dialog, Transition, Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import Icon from "@/components/ui/Icon";
import { Link, useNavigate } from "react-router-dom";
import { products } from "@/constant/data";

const SearchModal = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchList = [...products];

  const filteredsearchList = searchList.filter((item) =>
    item.refNum.toLowerCase().includes(query.toLowerCase()) ||
    item.proposer.toLowerCase().includes(query.toLowerCase()) ||
    item.ptitle.toLowerCase().includes(query.toLowerCase()) ||
    item.benAdd.toLowerCase().includes(query.toLowerCase()) 
    // || item.proposerAdd.toLowerCase().includes(query.toLowerCase())

  );

  const handleSelect = (item) => {
    navigate(item.track + "/" + item.refNum);
  };

  return (
    <>
      <Combobox onChange={handleSelect}>
        <div className="relative w-full">
          <div>
            <div className="flex mr-6 dark:bg-transparent px-6 py-3 items-center  rounded-full bg-kog-50 shadow-[0px_0px_50px_13px_rgba(0,0,0,0.5)] backdrop-blur-lg">
              <div className="flex-0 text-slate-700 dark:text-slate-300 ltr:pr-2 rtl:pl-2 text-lg">
                <Icon icon="heroicons-outline:search" />
              </div>
              <Combobox.Input
                className="bg-transparent outline-none focus:outline-none border-none w-full flex-1 dark:placeholder:text-slate-300 dark:text-slate-200"
                placeholder="Search Proposal..."
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <Combobox.Options className="max-h-80 min-h-80 min-w-80 max-w-80 overflow-y-auto text-sm py-2 bg-kog-300 rounded-xl backdrop-blur-xl fixed cursor-pointer">
              {filteredsearchList.length === 0 && query !== "" && (
                <div className="text-base py-2 px-4">
                  <p className="text-base text-white">
                    No result found
                  </p>
                </div>
              )}
              {filteredsearchList.map((item, i) => (
                <Combobox.Option key={i} value={item}>
                  {({ active }) => (
                    <div
                      className={`px-4 text-[15px]  font-normal capitalize py-2 ${active
                        ? "bg-slate-900  text-white"
                        : "text-white"
                        }`}
                    >
                      <span>{item.refNum} - </span>
                      <span>{item.proposer} - </span>
                      <span>{item.ptitle}</span>
                    </div>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </div>
      </Combobox>
    </>
  );
};

export default SearchModal;
