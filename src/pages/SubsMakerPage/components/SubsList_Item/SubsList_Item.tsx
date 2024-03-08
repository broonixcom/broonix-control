import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Card, Divider } from 'antd'

import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'

import { SUB_TYPE } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'
import { ISub } from '@atoms/subsMakerAtoms/subsAtom/subsAtomTypes'

import SubsList_List_Btns from '../SubsList_List_Btns'

import './SubsList_ItemStyles.scss'
import { ISubsList_ItemProps } from './SubsList_ItemTypes'

const SubsList_Item: React.FC<ISubsList_ItemProps> = ({
  sub,
  index,
  selectedLang,
  selectedQty,
}) => {
  const { t } = useTranslation()
  const { id } = useParams()

  const [subs] = useAtom(subsAtom)
  const [langSupport] = useAtom(langSupportAtom)

  const [isAlarm, setAlarm] = useState(false)

  useEffect(() => {
    // let emptyQtyInSub

    // id && subs[id].qty?.forEach(qty => {
    //   sub.pricesPerQty && Object.keys(sub.pricesPerQty).find(key => Number(key) === qty ? emptyQtyInSub = true : emptyQtyInSub = false)
    // })

    if (sub.pricesPerQty && id) {
      const arr1 = subs[id].qty
      const arr2 = Object.keys(sub.pricesPerQty).map(key => Number(key))

      console.log('arr1', arr1)
      console.log('arr2', arr2)

      setAlarm(!arr1?.every((val, i) => val === arr2[i]))

    }

    // const  = sub.pricesPerQty
    //   && id
    //   && Object.keys(sub.pricesPerQty).map(num => Number(num))

    // const emptyQtyInSub2 = id && subs[id].qty


    // console.log(emptyQtyInSub1, emptyQtyInSub2)

    // const emptylangInSub =
    //   sub.subInfo &&
    //   Object.values(sub.subInfo).some(
    //     (val) => !val.subDescTxt || !val.subNameTxt || !val.subTotalTxt,
    //   )

    // emptyQtyInSub ? setAlarm(true) : setAlarm(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subs, langSupport])

  if (!id || !selectedLang || !selectedQty) {
    return
  }

  const pricePerMonth = (sub: ISub) => {
    if (id === SUB_TYPE.place) {
      return `$${sub.pricePerMonth}`
    } else {
      return `$${sub.pricesPerQty?.[selectedQty]}`
    }
  }

  const noDiscountPrice = (subMonths?: number) => {
    const baseSub = subs[id].subs.find((sub) => sub.base)

    if (
      id === SUB_TYPE.place &&
      baseSub &&
      baseSub.pricePerMonth &&
      subMonths
    ) {
      return `$${(subMonths * baseSub.pricePerMonth).toFixed(2)}`
    }
    if (baseSub && baseSub.pricesPerQty && subMonths) {
      return `$${(subMonths * baseSub.pricesPerQty[selectedQty]).toFixed(2)}`
    }
  }

  const totalPrice = ({
    pricePerMonth,
    subMonths,
    pricesPerQty,
    subInfo,
  }: ISub) => {
    if (id === SUB_TYPE.place && pricePerMonth && subMonths) {
      return `$${pricePerMonth * subMonths}`
    }
    if (pricesPerQty && subMonths && subInfo) {
      return `$${(pricesPerQty[selectedQty] * subMonths).toFixed(2)} ${subInfo[selectedLang]?.subTotalTxt}`
    }
  }

  return (
    <Card
      key={'SUB' + index}
      className={clsx({
        ['SubsList_Item-body']: true,
        ['SubsList_Item-body-subAlarm']: isAlarm,
        ['SubsList_Item-body-subFocused']: sub.focus,
      })}
    >
      <p className="SubsList_Item-body-name">
        {sub.subInfo?.[selectedLang]?.subNameTxt}
      </p>
      <p className="SubsList_Item-body-desc">
        {sub.subInfo?.[selectedLang]?.subDescTxt}
      </p>
      <Divider />
      <p className="SubsList_Item-body-perMonth">
        {pricePerMonth(sub)}
        <span>{t('SubsMakerPage.PerMonth')}</span>
      </p>
      <p className="SubsList_Item-body-totalNoDiscount">
        {!sub.base && noDiscountPrice(sub.subMonths)}
      </p>
      <p className="SubsList_Item-body-total">{totalPrice(sub)}</p>
      <SubsList_List_Btns {...{ index, sub }} />
    </Card>
  )
}

export default SubsList_Item
