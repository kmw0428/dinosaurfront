import './style.css';

const Safety = () => {
    return (

      <div className="table-container">

        <br /><h2>안전 점검 일정</h2><br />
        <table>
          <thead>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th><span>수</span></th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="highlight">
                <p>매주</p>
                <p>수요일</p>
                <p><span>안전 점검</span></p>
                <p>오전 7시</p>
                <p>~</p>
                <p>오전 11시</p>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <button className="edit-button">Edit</button>
      </div>
    );
  }
export default Safety;