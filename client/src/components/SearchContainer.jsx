import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, Link, useSubmit } from 'react-router-dom';
import { JOB_SORT_BY, JOB_TYPE, JOB_STATUS } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const submit = useSubmit();
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  const debounce = (onChange) => {
    let timeOut;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={jobStatus}
            list={['all', ...Object.values(JOB_STATUS)]}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={jobType}
            list={['all', ...Object.values(JOB_TYPE)]}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset
          </Link>
          {/* <SubmitBtn formBtn text="Search" load="Searching..." /> */}
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
