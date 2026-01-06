import { Table, Column, AutoSizer } from 'react-virtualized'
import 'react-virtualized/styles.css' // Optional default styles
import { useRouter } from 'next/navigation'
import CheckDnsButton from '../UtilsCom/CheckDnsButton'
import LoadingPage from '../UtilsCom/LoadingPage'

const DomainTable2 = ({ data, loading }) => {
    const router = useRouter();

    if (loading) return <LoadingPage height="h-[50vh] w-full" />;

    if (!loading && data?.length === 0) {
        return (
            <div className='min-h-[60vh] w-full flex'>
                <p className='m-auto'>No Domains are added so far!!</p>
            </div>
        );
    }

    const rowGetter = ({ index }) => data[index];

    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        width={width}
                        height={height}
                        headerHeight={40}
                        rowHeight={50}
                        rowCount={data.length}
                        rowGetter={rowGetter}
                        rowClassName={({ index }) =>
                            index % 2 === 0 ? 'bg-slate-100' : ''
                        }
                    >
                        <Column label="SI No" dataKey="" width={70} cellRenderer={({ rowIndex }) => rowIndex + 1} />
                        <Column
                            label="Domain Name"
                            dataKey="domain"
                            width={250}
                            cellRenderer={({ rowData }) => (
                                <span
                                    className="cursor-pointer text-blue-600"
                                    onClick={() => router.push(`/domains/${rowData.domain}`)}
                                >
                                    {rowData.domain}
                                </span>
                            )}
                        />
                        <Column
                            label="Default Storage Capacity"
                            dataKey="mailCow"
                            width={230}
                            cellRenderer={({ rowData }) => {
                                let q = (rowData?.mailCow?.quota_used_in_domain / 1e9).toFixed(2)
                                let total = (rowData?.quota / 1000).toFixed(1)
                                return `${q} GiB / ${total} GiB`
                            }}
                        />
                        <Column
                            label="Default Mailbox Size"
                            dataKey="mailCow"
                            width={180}
                            cellRenderer={({ rowData }) =>
                                (Number(rowData?.mailCow?.def_quota_for_mbox) / 1e9).toFixed(1) + ' GiB'
                            }
                        />
                        <Column
                            label="Max Size of Mailbox"
                            dataKey="maxquota"
                            width={180}
                            cellRenderer={({ rowData }) => (rowData.maxquota / 1000).toFixed(1) + ' GiB'}
                        />
                        <Column
                            label="Max Mailboxes"
                            dataKey=""
                            width={150}
                            cellRenderer={({ rowData }) =>
                                `${rowData?.mailCow?.mboxes_in_domain}/${rowData?.mailboxes}`
                            }
                        />
                        <Column
                            label="Active Status"
                            dataKey="active"
                            width={130}
                            cellRenderer={({ rowData }) => rowData.active === '1' ? 'Active' : 'Inactive'}
                        />
                        <Column
                            label="Action"
                            dataKey="domain"
                            width={120}
                            cellRenderer={({ cellData }) => <CheckDnsButton domain={cellData} />}
                        />
                    </Table>
                )}
            </AutoSizer>
        </div>
    );
};

export default DomainTable2;
