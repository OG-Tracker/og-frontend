//  Filters for the products 
 <Card className="lg:col-span-3 lg:block  hidden   xs h-max col-span-12">
          <InputGroup
            type="text"
            prepend={<Icon icon="heroicons-outline:search" />}
            placeholder="Search"
            merged
            value={searchFilter}
            onChange={handleSearchChange}
          />
          <div className="space-y-6  divide-y divide-slate-200  dark:divide-slate-700 ">
            <div className="space-y-2 ltr:-ml-6 ltr:pl-6 rtl:-mr-6 rtl:pr-6">
              <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase pt-5 pb-2">
                categories
              </div>
              {categories.map((category, i) => (
                <CatagoriesFilterCheckbox
                  key={`cata_key_${i}`}
                  categoryFilter={categoryFilter}
                  handleCategoryChange={handleCategoryChange}
                  category={category}
                />
              ))}

              <button className="text-xs font-medium text-slate-900  dark:text-slate-300 pt-1">
                View Less
              </button>
            </div>
            <div className="space-y-2 ltr:-ml-6 ltr:pl-6 rtl:-mr-6 rtl:pr-6">
              <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase pt-5 pb-2">
                brands
              </div>
              {brands.map((brand, i) => (
                <BrandsCheckbox key={`brand_key_${i}`} brand={brand} />
              ))}

              <button className="text-xs font-medium text-slate-900  dark:text-slate-300 pt-1">
                View Less
              </button>
            </div>
            <div className="space-y-2 ltr:-ml-6 ltr:pl-6 rtl:-mr-6 rtl:pr-6">
              <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase pt-5 pb-2">
                price
              </div>
              {price.map((item, i) => (
                <PriceCheckbox key={`price_key_${i}`} item={item} />
              ))}
              {/* tests */}
            </div>
            <div className="space-y-2 ltr:-ml-6 ltr:pl-6 rtl:-mr-6 rtl:pr-6">
              <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase pt-5 pb-2">
                ratings
              </div>
              {ratings.map((item, i) => (
                <CheckboxSingle key={`checkbox_key_${i}`} item={item} />
              ))}
            </div>
          </div>
        </Card>