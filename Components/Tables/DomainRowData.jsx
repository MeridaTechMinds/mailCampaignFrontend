import { FixedSizeList as List } from 'react-window'
import CheckDnsButton from '../UtilsCom/CheckDnsButton'

export const DomainRowData = ({ index, style, data }) => {
    const item = data[index]
    let mailcowdata = item?.mailCow
    let quataUsed = (mailcowdata?.quota_used_in_domain / 1000000000).toFixed(2)
    let mailBox = mailcowdata?.mboxes_in_domain
    let defMailBoxSize = (Number(mailcowdata?.def_quota_for_mbox) / 1000000000).toFixed(1)

    return (
        <tr style={style} key={index} className={` ${index % 2 == 0 ? 'bg-slate-100' : ''}`}>
            <td>{index + 1}</td>
            <td className='cursor-pointer !text-blue-600'
                onClick={() => data.navigate.push(`/domains/${item?.domain}`)}>{item?.domain}</td>
            <td>{Number(quataUsed) > 0 ? `${quataUsed} GiB ` : '0 B'} / {item?.quota / 1000} GiB</td>
            <td>{defMailBoxSize} GiB</td>
            <td>{(Number(item?.maxquota) / 1000).toFixed(1)} GiB</td>
            <td>{mailBox}/{item?.mailboxes}</td>
            <td>{item?.active == '1' ? 'Active' : 'InActive'}</td>
            <td><CheckDnsButton domain={item?.domain} /></td>
        </tr>
    )
}
