import React, { Fragment, useState } from "react"
import ReloadIcon from "../../../../assets/icons/ReloadIcon"
import AvatarImg from "../../../../assets/avatar/avatar-7.png"
import {
  CustomSelect,
  FilterContainer,
  PageContainer,
  ReloadIconContainer,
  Result,
  ResultContainer,
  ResultItemAvatar,
  ResultItemContainer,
  ResultItemLeftContainer,
  ResultItemText,
  TextAvatar
} from "./Activity.styled"
import moment from "moment"
import { useEffect } from "react"

const timeData = [{ value: "all", label: "All Time" }]

const resultCountData = [{ value: 250, label: 250 }]
const resultsData = [
  {
    resultTitle: "Today",
    data: [
      {
        name: "Jane Cooper",
        avatar: AvatarImg,
        description: "uploaded document vets.csv.",
        date: "Jul 1, 2022"
      },
      {
        name: "Jane Cooper",
        avatar: AvatarImg,
        description: "uploaded document vets.csv.",
        date: "Jul 1, 2022"
      }
    ]
  },
  {
    resultTitle: "Yesterday",
    data: [
      {
        name: "Jane Cooper",
        avatar: AvatarImg,
        description: "uploaded document vets.csv.",
        date: "Jul 1, 2022"
      },
      {
        name: "Jane Cooper",
        avatar: AvatarImg,
        description: "uploaded document vets.csv.",
        date: "Jul 1, 2022"
      },
      {
        name: "Jane Cooper",
        avatar: AvatarImg,
        description: "uploaded document vets.csv.",
        date: "Jul 1, 2022"
      },
      {
        name: "Jane Cooper",
        avatar: AvatarImg,
        description: "uploaded document vets.csv.",
        date: "Jul 1, 2022"
      },
      {
        name: "Jane Cooper",
        avatar: AvatarImg,
        description: "uploaded document vets.csv.",
        date: "Jul 1, 2022"
      }
    ]
  }
]

const Activity = ({ name, data, getData, avatar }) => {
  const [selectedTime, setSelectedTime] = useState(timeData[0])
  const [resultCount, setResultCount] = useState(resultCountData[0])
  const [resultData, setResultData] = useState([])

  useEffect(() => {
    if (data) {
      const arr = data.map(item => item.date)
      const result = []
      arr
        .filter((item, index) => arr.indexOf(item) === index)
        .sort((a, b) => new Date(b) - new Date(a))
        .map(item => {
          result.push({
            resultTitle: moment(item).fromNow(true).includes("hour")
              ? "Today"
              : moment(item).fromNow(true) === "a day"
              ? "Yesterday"
              : moment(item).format("MMM DD, YYYY"),
            data: data.filter(element => element.date === item)
          })
        })
      setResultData([...result])
    }
  }, [data])

  return (
    <PageContainer>
      <FilterContainer>
        <Result>MAX RESULTS:</Result>
        <CustomSelect
          width="80px"
          margin="0 10px 0 5px"
          value={resultCount}
          onChange={e => setResultCount(e.target.value)}
        >
          {resultCountData.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </CustomSelect>
        <CustomSelect
          width="105px"
          value={selectedTime}
          onChange={e => setSelectedTime(e.target.value)}
        >
          {timeData.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </CustomSelect>
        <ReloadIconContainer onClick={getData}>
          {ReloadIcon}
        </ReloadIconContainer>
      </FilterContainer>
      <ResultContainer>
        {resultsData.map((result, index) => (
          <Fragment key={index}>
            <Result margin={index > 0 && "20px 0 0 0"}>
              {result.resultTitle}
            </Result>
            {result.data.map((item, i) => (
              <ResultItemContainer key={i}>
                <ResultItemLeftContainer>
                  {avatar ? (
                    <ResultItemAvatar src={avatar} alt="result-avatar" />
                  ) : (
                    <TextAvatar>{name[0]}</TextAvatar>
                  )}
                  <ResultItemText
                    className="text-capitalize"
                    color="#0496FF"
                    margin="0 5px 0 0"
                  >
                    {name}
                  </ResultItemText>
                  <ResultItemText>{item.description}</ResultItemText>
                </ResultItemLeftContainer>
                <ResultItemText margin="17px 0 0 0">{item.date}</ResultItemText>
              </ResultItemContainer>
            ))}
          </Fragment>
        ))}
      </ResultContainer>
    </PageContainer>
  )
}

export default Activity
