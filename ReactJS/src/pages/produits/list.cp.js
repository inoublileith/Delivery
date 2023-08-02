import { Row, Col, Card, Table, Button } from 'antd'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

import { Popconfirm } from 'antd'

import ProduitDataService from '../../services/produit.service'

import { QuestionCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const plus = [
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    height={15}
    width={15}
    fill='#fff'
  >
    <path d='M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z' />
  </svg>,
]
const xsign = [
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    width={15}
    height={15}
    fill='#fff'
  >
    <path d='M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z' />
  </svg>,
]
const pen = [
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    width={15}
    height={15}
    fill='#fff'
  >
    <path d='M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z' />
  </svg>,
]

function ShowProduits() {
  // useEffect(() => {
  //   document.title = "Pharmachain - Rayons";
  // }, []);

  const { user: currentUser } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const [produits, setProduits] = useState([])

  const retrieveProduits = () => {
    ProduitDataService.getAll(currentUser.id)
      .then((response) => {
        setProduits(response.data)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
  }

  useEffect(() => {
    retrieveProduits()
  }, [])

  const columns = [
    {
      title: 'titre',
      dataIndex: 'titre',
      key: 'titre',
      ellipsis: true,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },

    {
      title: 'quantite',
      key: 'quantite',
      dataIndex: 'quantite',
      ellipsis: true,
    },

    {
      title: 'promotion',
      key: 'promotion',
      dataIndex: 'promotion',
      ellipsis: true,
    },

    {
      title: 'remise',
      key: 'remise',
      dataIndex: 'remise',
      ellipsis: true,
    },

    {
      title: 'code_promo',
      key: 'code_promo',
      dataIndex: 'code_promo',
      ellipsis: true,
    },

    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 245,

      render: (_, record) => (
        <>
          <Button
            type='primary'
            className='tag-primary'
            style={{ width: 110 }}
            onClick={() => openProduit(record.id)}
          >
            {pen}Modifier
          </Button>

          <Popconfirm
            title='Voulez-vous vraiment supprimer cet enregistrement?'
            okText='Yes'
            cancelText='No'
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => deleteProduit(record.id)}
          >
            <Button
              type='danger'
              className='tag-secondary'
              style={{ width: 110, marginLeft: 10 }}
            >
              {xsign} Supprimer
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  const [loading, setLoading] = useState(true)

  const removeAllProduits = () => {
    ProduitDataService.deleteAll()
      .then((response) => {
        console.log(response.data)
        retrieveProduits()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteProduit = (id) => {
    ProduitDataService.delete(id)
      .then(() => {
        retrieveProduits()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const openProduit = (id) => {
    navigate('/editProduit/' + id)
  }

  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]}>
          <Col xs='24' xl={24}>
            <Card
              bordered={true}
              className='criclebox tablespace mb-24'
              title='Produits'
              extra={
                <>
                  <Button
                    type='primary'
                    className='tag-primary'
                    style={{ width: 100, color: '#fff' }}
                    onClick
                  >
                    <Link to={'/addProduit'}>{plus}Ajouter</Link>
                  </Button>
                  <Popconfirm
                    title='Voulez-vous vraiment supprimer tous les enregistrements?'
                    okText='Yes'
                    cancelText='No'
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={removeAllProduits}
                    placement='bottom'
                  >
                    <Button
                      type='danger'
                      className='tag-primary'
                      style={{ width: 140, color: '#fff', marginLeft: 10 }}
                    >
                      {xsign} Supprimer tous
                    </Button>
                  </Popconfirm>
                </>
              }
            >
              <div
                className='table-responsive'
                style={{ paddingLeft: 20, paddingRight: 20 }}
              >
                <Table
                  bordered={true}
                  loading={loading}
                  scroll={{ x: 1500 }}
                  size='small'
                  pagination={true}
                  columns={columns}
                  dataSource={produits}
                  className='ant-border-space'
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ShowProduits
