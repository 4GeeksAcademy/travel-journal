"""empty message

Revision ID: 65935fc6b000
Revises: e8225fcd8571
Create Date: 2024-07-19 18:48:21.676213

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '65935fc6b000'
down_revision = 'e8225fcd8571'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(length=8),
               type_=sa.String(length=20),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=8),
               existing_nullable=False)

    # ### end Alembic commands ###