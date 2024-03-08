import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Button, message } from 'antd'
import { IconDeviceFloppy } from '@tabler/icons-react'

import useCreateData from '@api/basicApi/useCreateData'
import useUpdateData from '@api/basicApi/useUpdateData'
import { API_COLLECTION, RES_CODE } from '@api/apiConstants'

import { SUB_TYPE } from '../../SubsMakerPageConstants'

import './SaveBtnStyles.scss'

const SaveBtn: React.FC = () => {
  const { t } = useTranslation()
  const params = useParams()
  const [messageApi, contextHolder] = message.useMessage()

  const createData = useCreateData()
  const updateData = useUpdateData()

  useEffect(() => {
    if (createData.status === RES_CODE.ok) {
      messageApi.success(t('Message.Saved'))
    }
    if (updateData.status === RES_CODE.ok) {
      messageApi.success(t('Message.Updated'))
    }
    if (
      createData.status === RES_CODE.error ||
      updateData.status === RES_CODE.error
    ) {
      messageApi.error(t('Message.Error'))
    }
  }, [createData.status, updateData.status, messageApi, t])

  const handleSave = async () => {
    // const langCheck = subsState.subs?.some((sub) =>
    //   Object.values(sub.subInfo).some(
    //     ({ subDesc, subName }) => !subDesc || !subName,
    //   ),
    // )
    // const pricesCheck =
    //   params.id !== SUB_TYPE.place &&
    //   subsState.subs?.some(
    //     ({ pricesPerQty }) =>
    //       pricesPerQty && Object.values(pricesPerQty).some((price) => !price),
    //   )
    // if (langCheck || pricesCheck) {
    //   return messageApi.error(t('SubsMakerPage.SavedNotEnoughInfo'))
    // }
    // setChanged(false)
    // if (isItNew && params.id) {
    //   await createData.foo(API_COLLECTION.subscriptions, params.id, subsState)
    //   setItNew(false)
    //   return
    // }
    // if (params.id) {
    //   await updateData.foo(API_COLLECTION.subscriptions, params.id, subsState)
    //   return
    // }
  }

  return (
    <>
      {contextHolder}
      <Button
        className="SaveBtn-body"
        type="primary"
        icon={<IconDeviceFloppy />}
        // disabled={!isChanged}
        onClick={handleSave}
        loading={createData.isLoading || updateData.isLoading}
      >
        {t('Button.Save')}
      </Button>
    </>
  )
}

export default SaveBtn
